"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.User.findOne({
            email: data.email,
        });
        if (existingUser)
            return { success: false, message: "Email already registered" };
        const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
        const user = new user_model_1.User({
            email: data.email,
            password: hashedPassword,
        });
        yield user.save();
        return {
            success: true,
            message: "User registered successfully",
            data: user,
        };
    }
    catch (error) {
        return { success: false, message: "Registration failed" };
    }
});
exports.registerUser = registerUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }
        const isMatch = yield bcryptjs_1.default.compare(data.password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid email or password" };
        }
        const tokenData = {
            userId: user._id.toString(),
            email: user.email,
        };
        const token = (0, jwt_1.generateToken)(tokenData);
        return {
            success: true,
            message: "Login successful",
            data: { id: user._id, email: user.email },
            token,
        };
    }
    catch (error) {
        return { success: false, message: "Login failed" };
    }
});
exports.loginUser = loginUser;
