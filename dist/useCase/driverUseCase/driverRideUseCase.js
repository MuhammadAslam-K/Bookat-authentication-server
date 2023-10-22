"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
const rideRepositorySaveQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositorySaveQuery"));
exports.default = {
    getUser: async (userId) => {
        try {
            return (await userRepositoryGetQuery_1.default.getUserWithId(userId));
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    saveNewRide: async (data) => {
        try {
            const response = await rideRepositorySaveQuery_1.default.saveRideInfo(data);
            return response._id;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
