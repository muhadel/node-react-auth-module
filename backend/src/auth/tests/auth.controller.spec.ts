import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { SignUpRequestDto, SignInRequestDto } from "../dto";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("signUp", () => {
    it("should call authService.signUp with the correct parameters", async () => {
      const signUpDto: SignUpRequestDto = {
        email: "test@example.com",
        password: "Test@123",
        firstName: "John",
        lastName: "Doe",
      };

      await controller.signUp(signUpDto);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe("signIn", () => {
    it("should call authService.signIn with the correct parameters", async () => {
      const signInDto: SignInRequestDto = {
        email: "test@example.com",
        password: "Test@123",
      };

      await controller.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
    });
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
