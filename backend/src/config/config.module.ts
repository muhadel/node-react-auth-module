// import { Module } from '@nestjs/common';

// @Module({})
// export class ConfigModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configurations } from "./config";
import { validateConfig } from "./config-validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [...configurations],
      isGlobal: true,
      validate: validateConfig,
    }),
  ],
})
export class ConfigsModule {}
