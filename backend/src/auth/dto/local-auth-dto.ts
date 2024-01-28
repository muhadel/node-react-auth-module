import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, Matches, IsDefined, IsEmail } from "class-validator";

export class LocalAuthRequestDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z])).*$/, { message: `Password is too weak!` })
  @ApiProperty()
  password: string;
}

export class LocalAuthResponseDto {
  data?: {
    token: string;
  };
  error?: {
    message: string;
  };
}
