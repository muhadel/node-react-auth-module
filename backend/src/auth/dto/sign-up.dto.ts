import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDefined, IsEmail, MinLength, MaxLength, Matches } from "class-validator";
import { LocalAuthRequestDto, LocalAuthResponseDto } from "./local-auth-dto";

export class SignUpRequestDto extends LocalAuthRequestDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  lastName: string;
}

export class SignUpResponseDto extends LocalAuthResponseDto {}
