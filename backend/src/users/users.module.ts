import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UsersService],
})
export class UsersModule {}
