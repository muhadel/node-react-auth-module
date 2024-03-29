import { Request } from "express";
import { User } from "src/users/types/user";

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
