"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const rideRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryUpdateQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideGetQuery"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideUpdateQuery"));
exports.default = {
    getDriverById: async (driverId) => {
        try {
            return await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideDetails: async (rideId) => {
        try {
            console.log("rideId", rideId);
            const result = await rideRepositoryGetQuery_1.default.findRideWithId(rideId);
            if (!result) {
                const scheduledRide = await scheduleRideGetQuery_1.default.getScheduledRidesById(rideId);
                if (scheduledRide) {
                    return scheduledRide;
                }
                else {
                    return null;
                }
            }
            else {
                return result;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    payment: async (data, userId) => {
        try {
            await Promise.all([
                userRepositoryUpdateQuery_1.default.updateTotalRide(userId),
                driverRepositoryUpdateQuerys_1.default.updateTotalRide(data.driverId),
                driverRepositoryUpdateQuerys_1.default.changeTheRideStatus(data.driverId),
            ]);
            const result = await rideRepositoryUpdateQuery_1.default.updatePaymentInfo(data);
            if (!result) {
                const scheduledRide = await scheduleRideUpdateQuery_1.default.updatePaymentInfo(data);
                if (scheduledRide) {
                    return scheduledRide;
                }
                else {
                    return null;
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rides: async (userId) => {
        try {
            return await rideRepositoryGetQuery_1.default.getRides(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentRide: async (userId) => {
        try {
            const response = await rideRepositoryGetQuery_1.default.getCurrentRideForUser(userId);
            if (response.length == 0) {
                const scheduleRide = await scheduleRideGetQuery_1.default.getCurrentScheduledRideForUser(userId);
                if (scheduleRide.length == 0) {
                    return null;
                }
                else {
                    return scheduleRide;
                }
            }
            else {
                return response;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
