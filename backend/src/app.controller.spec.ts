import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigsModule } from "./config/config.module";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigsModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return application healthy!", () => {
      const result = appController.getHealth();
      expect(result.status).toBe("healthy");
    });
  });
});
