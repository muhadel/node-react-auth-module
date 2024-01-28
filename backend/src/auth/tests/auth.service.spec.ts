import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { SignUpRequestDto, SignInRequestDto } from "../dto";

// Mock UsersService
class MockUsersService {
  getByEmail(email: string) {
    // Mock implementation
  }

  create(user: any) {
    // Mock implementation
  }
}

// Mock JwtService
class MockJwtService {
  sign(payload: any, options?: any): string {
    // Mock implementation
    return "mocked-token";
  }
}

// Mock ConfigService
class MockConfigService {
  get(key: string) {
    // Mock implementation based on your needs
    return {
      jwtSecretKey: "your-secret-key",
      jwtExpiresIn: "3600s", // 1 hour
      saltRounds: 10, // Bcrypt salt rounds
    };
  }
}

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
        {
          provide: JwtService,
          useClass: MockJwtService,
        },
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe("signUp", () => {
    it("should sign up a new user and return a JWT token", async () => {
      const signUpRequestDto: SignUpRequestDto = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "Test@123",
      };

      jest.spyOn(usersService, "getByEmail").mockResolvedValueOnce(null);
      jest.spyOn(usersService, "create").mockResolvedValueOnce({} as any);

      const result = await authService.signUp(signUpRequestDto);

      expect(result.data.token).toBeDefined();
    });

    it("should throw an error if the user already exists", async () => {
      const signUpRequestDto: SignUpRequestDto = {
        email: "existinguser@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "Test@123",
      };

      jest.spyOn(usersService, "getByEmail").mockResolvedValueOnce({} as any);

      await expect(authService.signUp(signUpRequestDto)).rejects.toThrowError(
        new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe("signIn", () => {
    it("should sign in a user and return a JWT token", async () => {
      const signInRequestDto: SignInRequestDto = {
        email: "test@example.com",
        password: "Test@123",
      };

      const mockUser = {
        _id: "<id>",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: await bcrypt.hash("Test@123", 10),
      };

      jest.spyOn(usersService, "getByEmail").mockResolvedValueOnce(mockUser);

      const result = await authService.signIn(signInRequestDto);

      expect(result.data.token).toBeDefined();
    });

    it("should throw an error if the user is not found", async () => {
      const signInRequestDto: SignInRequestDto = {
        email: "nonexistent@example.com",
        password: "Test@123",
      };

      jest.spyOn(usersService, "getByEmail").mockResolvedValueOnce(null);

      await expect(authService.signIn(signInRequestDto)).rejects.toThrowError(
        new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST),
      );
    });

    it("should throw an error if the provided credentials are invalid", async () => {
      const signInRequestDto: SignInRequestDto = {
        email: "test@example.com",
        password: "InvalidPassword",
      };

      const mockUser = {
        _id: "<id>",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: await bcrypt.hash("Test@123", 10),
      };

      jest.spyOn(usersService, "getByEmail").mockResolvedValueOnce(mockUser);

      await expect(authService.signIn(signInRequestDto)).rejects.toThrowError(
        new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST),
      );
    });
  });
});
