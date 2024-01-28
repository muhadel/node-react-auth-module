import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SignInRequestDto, SignInResponseDto, SignUpRequestDto, SignUpResponseDto } from "./dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { TokenPayload } from "./types/token-payload";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "../config/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Signs up a new user by creating an account and generating a JWT token.
   * @param signUpRequestDto - DTO containing user information for sign-up.
   * @returns A response DTO containing the generated JWT token.
   * @throws HttpException with status BAD_REQUEST if the user already exists.
   */
  async signUp(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, firstName, lastName, password } = signUpRequestDto;

    const user = await this.usersService.getByEmail(email);

    if (user) {
      throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, this.configService.get(ConfigKey.Bcrypt).saltRounds);
    const newUser = await this.usersService.create({ ...signUpRequestDto, password: hashedPassword });

    const jwtToken = this.getJwtToken({ firstName, lastName, email });
    return { data: { token: jwtToken } };
  }

  /**
   * Signs in a user by verifying credentials and generating a JWT token.
   * @param signInRequestDto - DTO containing user credentials for sign-in.
   * @returns A response DTO containing the generated JWT token.
   * @throws HttpException with status BAD_REQUEST if the user is not found or credentials are invalid.
   */
  async signIn(signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = signInRequestDto;

    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }

    await this.verifyPassword(password, user.password);

    const jwtToken = this.getJwtToken({ firstName: user.firstName, lastName: user.lastName, email });
    return { data: { token: jwtToken } };
  }

  /**
   * Verifies if the provided plain text password matches the hashed password.
   * @param plainTextPassword - The plain text password.
   * @param hashedPassword - The hashed password to compare against.
   * @throws HttpException with status BAD_REQUEST if the passwords do not match.
   */
  private async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Generates a JWT token using the provided payload.
   * @param payload - The payload to be included in the JWT token.
   * @returns The generated JWT token.
   */
  public getJwtToken(payload: TokenPayload): string {
    const { jwtSecretKey, jwtExpiresIn } = this.configService.get(ConfigKey.Jwt);
    return this.jwtService.sign(payload, { secret: jwtSecretKey, expiresIn: jwtExpiresIn });
  }
}
