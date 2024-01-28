export interface SignUpRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponseDto {
  data: { token: string };
}

export interface SignInRequestDto {
  email: string;
  password: string;
}

export interface SignInResponseDto {
  data: { token: string };
}
