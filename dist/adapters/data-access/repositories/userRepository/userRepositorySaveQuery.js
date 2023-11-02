"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user-model"));
exports.default = {
    saveUser: async (data, refferalCode) => {
        try {
            const user = new user_model_1.default({
                ...data,
                refrel: refferalCode,
            });
            return await user.save();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
