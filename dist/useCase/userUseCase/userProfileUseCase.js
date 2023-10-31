"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
exports.default = {
    updateProfile: async (data, userId) => {
        try {
            return await userRepositoryUpdateQuery_1.default.updateUserProfile(data, userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getProfile: async (userID) => {
        try {
            return await userRepositoryGetQuery_1.default.getUserWithId(userID);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
