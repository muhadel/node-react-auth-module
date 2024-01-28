import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from "express";
import { TokenPayload } from "../types/token-payload";
import { ConfigKey } from "@/config/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.authorization;
        },
      ]),
      secretOrKey: configService.get(ConfigKey.Jwt).jwtSecretKey,
    });
  }

  async validate(payload: TokenPayload) {
    return this.usersService.getByEmail(payload.email);
  }
}
