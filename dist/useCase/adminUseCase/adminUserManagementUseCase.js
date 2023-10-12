"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/admin/adminRepositoryGetQuerys"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/admin/adminRepositoryUpdateQuery"));
exports.default = {
    getUsers: async () => {
        try {
            return await adminRepositoryGetQuerys_1.default.getAllUsers();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    blockUser: async (userId) => {
        try {
            return await adminRepositoryUpdateQuery_1.default.blockUser(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
