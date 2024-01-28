import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dto";
import { Model } from "mongoose";
import { User } from "../types/user";
import { Logger } from "@nestjs/common";

describe("UsersService", () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken("User"),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken("User")); // Move this line down
  });

  describe("create", () => {
    it("should create a new user and return the created user", async () => {
      const createUserDto: CreateUserDto = {
        email: "newuser@example.com",
        password: "Test@123",
        firstName: "John",
        lastName: "Doe",
      };

      const createdUser: User = {
        _id: "<id>",
        email: "newuser@example.com",
        password: "Test@123",
        firstName: "John",
        lastName: "Doe",
      };

      jest.spyOn(userModel, "create").mockResolvedValueOnce(createdUser as any);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual(createdUser);
    });

    it("should throw an error if there is an issue creating the user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "Test@123",
        firstName: "John",
        lastName: "Doe",
      };

      jest.spyOn(userModel, "create").mockImplementationOnce(() => {
        throw new Error("Failed to create user.");
      });

      await expect(usersService.create(createUserDto)).rejects.toThrowError("Failed to create user.");
    });
  });

  describe("getByEmail", () => {
    it("should retrieve a user by email", async () => {
      const email = "test@example.com";
      const user: User = {
        _id: "<id>",
        email: "test@example.com",
        password: "Test@123",
        firstName: "John",
        lastName: "Doe",
      };

      jest.spyOn(userModel, "findOne").mockResolvedValueOnce(user);

      const result = await usersService.getByEmail(email);

      expect(result).toEqual(user);
    });

    it("should return null if the user with the specified email is not found", async () => {
      const email = "nonexistent@example.com";

      jest.spyOn(userModel, "findOne").mockResolvedValueOnce(null);

      const result = await usersService.getByEmail(email);

      expect(result).toBeNull();
    });

    it("should throw an error if there is an issue retrieving the user", async () => {
      const email = "test@example.com";

      jest.spyOn(userModel, "findOne").mockRejectedValueOnce(new Error("Failed to get user by email."));

      await expect(usersService.getByEmail(email)).rejects.toThrowError("Failed to get user by email.");
    });
  });
});
