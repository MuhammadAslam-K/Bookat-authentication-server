"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
exports.default = {
    saveUser: async (data, refferalCode) => {
        try {
            const user = new userEntites_1.default({
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
