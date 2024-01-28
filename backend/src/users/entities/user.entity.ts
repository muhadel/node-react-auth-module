import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { ConfigKey } from "@/config/config";

const configService = new ConfigService();

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// type HookNextFunction = (err?: Error) => void;

// UserSchema.pre("save", async function (next: HookNextFunction) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }

//     const { saltRounds } = configService.get(ConfigKey.Bcrypt);
//     const hashed = bcrypt.hashSync(this["password"], bcrypt.genSaltSync(saltRounds));
//     this["password"] = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// UserSchema.methods.generateAuthToken = function () {
//   const { jwtExpiresIn, jwtSecretKey } = configService.get(ConfigKey.Jwt);
//   return jwt.sign({ id: this._id, name: this["name"], username: this["username"] }, jwtSecretKey, { expiresIn: jwtExpiresIn });
// };

// UserSchema.methods.validatePassword = function (password: string): Boolean {
//   return bcrypt.compareSync(password, this["password"]);
// };

// export const UserModel = mongoose.model("user", UserSchema);
