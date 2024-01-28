import { registerAs } from "@nestjs/config";
// import { AppConfig, DatabaseConfig } from '../config.interface';

export enum ConfigKey {
  App = "APP",
  Db = "DB",
  Jwt = "JWT",
  Bcrypt = "Bcrypt",
}

export enum Environment {
  Local = "local",
  Development = "development",
  Staging = "staging",
  Production = "production",
  Testing = "testing",
}

console.log("env-->", process.env.ENV, Environment[process.env.NODE_ENV as keyof typeof Environment]);

const APPConfig = registerAs(ConfigKey.App, () => ({
  env: Environment[process.env.NODE_ENV as keyof typeof Environment] || "development",
  port: Number(process.env.APP_PORT),
  appName: process.env.APP_NAME,
  prefix: process.env.PREFIX || "/api",
}));

const DBConfig = registerAs(ConfigKey.Db, () => ({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
}));

const JWTConfig = registerAs(ConfigKey.Jwt, () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));

const BcryptConfig = registerAs(ConfigKey.Bcrypt, () => ({
  saltRounds: Number(process.env.SALT_ROUNDS),
}));

export const configurations = [APPConfig, DBConfig, BcryptConfig, JWTConfig];
