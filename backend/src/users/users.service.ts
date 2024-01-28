import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./types/user";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel("User") private readonly usersRepository: Model<User>) {}

  /**
   * Creates a new user based on the provided user data.
   * @param userData - DTO containing user information for creation.
   * @returns The newly created user.
   * @throws Error if there's an issue creating the user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.usersRepository.create(createUserDto);
      return createdUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new Error("Failed to create user.");
    }
  }

  /**
   * Retrieves a user based on their email address.
   * @param email - The email address of the user to retrieve.
   * @returns The user with the specified email address, or null if not found.
   * @throws Error if there's an issue retrieving the user.
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ email });
    } catch (error) {
      this.logger.error(`Error selecting user by email: ${error.message}`, error.stack);
      throw new Error("Failed to get user by email.");
    }
  }
}
