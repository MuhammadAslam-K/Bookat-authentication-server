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
// import { profileUpdate } from "../driverUseCase/driverProfileUseCase";
// import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery";
// import { IUser } from "../../entites/userEntites";
// import { ObjectId } from "mongoose";
// import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery";
// interface UserRepository {
//     getUserWithId: (userId: ObjectId) => Promise<IUser | null>;
// }
// interface UserProfileUseCase {
//     getProfile: (userId: ObjectId) => Promise<IUser | null>;
// }
// const userProfileUseCase: UserProfileUseCase = {
//     getProfile: async (userId: ObjectId) => {
//         try {
//             return await userRepositoryGetQuery.getUserWithId(userId);
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     },
// };
// export default userProfileUseCase;
