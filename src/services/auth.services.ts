import bcrypt from "bcryptjs";

import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import {
  IUser,
  RegisterData,
  LoginData,
  ServiceResult,
} from "../types/user.types";

export const registerUser = async (
  data: RegisterData
): Promise<ServiceResult> => {
  try {
    const existingUser: IUser | null = await User.findOne({
      email: data.email,
    });
    if (existingUser)
      return { success: false, message: "Email already registered" };

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      email: data.email,
      password: hashedPassword,
    });

    await user.save();

    return {
      success: true,
      message: "User registered successfully",
      data: user,
    };
  } catch (error) {
    return { success: false, message: "Registration failed" };
  }
};

export const loginUser = async (data: LoginData): Promise<ServiceResult> => {
  try {
    const user: IUser | null = await User.findOne({ email: data.email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    const tokenData = {
      userId: user._id.toString(),
      email: user.email,
    };
    const token = generateToken(tokenData);

    return {
      success: true,
      message: "Login successful",
      data: { id: user._id, email: user.email },
      token,
    };
  } catch (error) {
    return { success: false, message: "Login failed" };
  }
};
