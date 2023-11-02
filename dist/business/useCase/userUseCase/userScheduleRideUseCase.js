"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideSaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideSaveQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    scheduleRide: async (data, userId) => {
        try {
            return await scheduleRideSaveQuery_1.default.saveNewRide(data, userId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getScheduledRideOfUser: async (userId) => {
        try {
            return await scheduleRideGetQuery_1.default.getPendingScheduledRidesWithUserId(userId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
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
            (0, errorHandling_1.handleError)(error);
        }
    },
    reScheduleRideWithRideId: async (data) => {
        try {
            const result = await scheduleRideGetQuery_1.default.getScheduledRidesById(data.rideId);
            if (result) {
                result.pickUpDate = data.selectedDateTime;
                await scheduleRideSaveQuery_1.default.rescheduleTheRide(result);
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
