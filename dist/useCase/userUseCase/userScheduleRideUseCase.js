"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideSaveQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideSaveQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideGetQuery"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideUpdateQuery"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
exports.default = {
    scheduleRide: async (data, userId) => {
        try {
            return await scheduleRideSaveQuery_1.default.saveNewRide(data, userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    // getScheduleRideHistory: async (userId: ObjectId) => {
    //     try {
    //         return await scheduleRideGetQuery.getScheduledRidesByUserId(userId)
    //     } catch (error) {
    //         throw new Error((error as Error).message)
    //     }
    // },
    getScheduledRideOfUser: async (userId) => {
        try {
            return await scheduleRideGetQuery_1.default.getPendingScheduledRidesWithUserId(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    cancelTheRide: async (data, userId) => {
        try {
            await Promise.all([
                scheduleRideUpdateQuery_1.default.cancelTheBookedRide(data.rideId),
                driverRepositoryUpdateQuerys_1.default.popUpTheScheduledRide(data.driverId, data.rideId),
                userRepositoryUpdateQuery_1.default.updateCancelledRides(userId)
            ]);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
