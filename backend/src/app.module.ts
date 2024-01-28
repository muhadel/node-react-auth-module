import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigsModule } from "./config/config.module";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "./config/config";
import { LoggerMiddleware } from "./utils/logger-middleware";

@Module({
  imports: [
    ConfigsModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, port, username, password, database } = configService.get(ConfigKey.Db);
        const uri = `mongodb://${username}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        return { uri, dbName: database };
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
