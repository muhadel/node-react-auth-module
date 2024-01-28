import { z } from "zod";
import { messages } from "@/utils/config/messages";

export const validateEmail = z.string().min(1, { message: messages.emailIsRequired }).email({ message: messages.invalidEmail });

export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(8, { message: messages.passwordLengthMin })
  .regex(new RegExp(".*[A-Z].*"), {
    message: messages.passwordOneUppercase
  })
  .regex(new RegExp(".*[a-z].*"), {
    message: messages.passwordOneLowercase
  })
  .regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric });

export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(8, { message: messages.passwordLengthMin })
  .regex(new RegExp(".*[A-Z].*"), {
    message: messages.passwordOneUppercase
  })
  .regex(new RegExp(".*[a-z].*"), {
    message: messages.passwordOneLowercase
  })
  .regex(new RegExp(".*\\d.*"), { message: messages.passwordOneNumeric });
