import jwt from "jsonwebtoken";

export const generateToken = (tokenData: object) => {
  return jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
