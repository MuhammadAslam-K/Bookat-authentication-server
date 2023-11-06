"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user-model"));
const userRepositoryGetQuery = {
    getUserWithId: async (userId) => {
        try {
            return await user_model_1.default.findById(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getUser: async (field, data) => {
        try {
            const query = {};
            query[field] = data;
            return await user_model_1.default.find(query);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllUsers: async () => {
        try {
            return await user_model_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.default = userRepositoryGetQuery;
// export default {
//     getUser: async (field: string, data: string) => {
//         try {
//             const query: { [key: string]: string } = {};
//             query[field] = data;
//             return await UserSchema.find(query);
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     },
//     getUserWithId: async (userId: ObjectId) => {
//         try {
//             return await UserSchema.findById(userId)
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     }
// }
