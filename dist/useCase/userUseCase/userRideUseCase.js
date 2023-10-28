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
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/admin/adminRepositoryUpdateQuery"));
exports.default = {
    getDriverById: async (driverId) => {
        try {
            return await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getDriverDetailsAndFeedbacks: async (driverId) => {
        try {
            const [driverData, feedBacksOfQuickRide, feedBacksOfScheduledRides] = await Promise.all([
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId),
                rideRepositoryGetQuery_1.default.getFeedbacksWithDriverId(driverId),
                scheduleRideGetQuery_1.default.getFeedbacksWithDriverId(driverId),
            ]);
            const feedBacks = [...feedBacksOfQuickRide, ...feedBacksOfScheduledRides];
            return { driverData, feedBacks };
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
            const priceInt = parseInt(data.price);
            const adminAmount = priceInt * 0.1;
            const driverAmount = priceInt * 0.9;
            await Promise.all([
                userRepositoryUpdateQuery_1.default.updateTotalRide(userId),
                driverRepositoryUpdateQuerys_1.default.updateTotalRideAndRevenu(data.driverId, driverAmount, data.rideId),
                adminRepositoryUpdateQuery_1.default.addRevenu(adminAmount)
            ]);
            const result = await rideRepositoryUpdateQuery_1.default.updatePaymentInfo(data, adminAmount, driverAmount);
            if (!result) {
                const scheduledRide = await scheduleRideUpdateQuery_1.default.updatePaymentInfo(data, adminAmount, driverAmount);
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
    getUserRidesHistory: async (userId) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery_1.default.getRideWithUserId(userId),
                scheduleRideGetQuery_1.default.getScheduledRidesByUserId(userId)
            ]);
            return { quickRides, scheduledRides };
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
    },
};
