import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SignInRequestDto, SignUpRequestDto, SignInResponseDto, SignUpResponseDto } from "./dto/";
import { AuthService } from "./auth.service";
import JwtAuthGuard from "./guards/jwt-auth.guard";
import RequestWithUser from "./types/requestWithUser";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "Sign Up API" })
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.authService.signUp(signUpRequestDto);
  }

  @Post("signin")
  @ApiOperation({ summary: "Sign In API" })
  signIn(@Body() signInRequestDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInRequestDto);
  }

  @Get("protected")
  @ApiOperation({ summary: "This endpoint require authentication & authorization" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  protected(@Req() request: RequestWithUser): any {
    return { message: `Hi ${request.user.firstName}, Welcome to the application.` };
  }
}
