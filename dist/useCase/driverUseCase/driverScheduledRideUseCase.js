"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideGetQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideGetQuery"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
exports.default = {
    getScheduledRideHistoryByDriverId: async (driverId) => {
        try {
            return await scheduleRideGetQuery_1.default.getScheduledRidesByDriverId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getNotApprovedScheduleRides: async () => {
        try {
            return await scheduleRideGetQuery_1.default.getNotApprovedScheduleRides();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    driverAcceptScheduledRide: async (rideId, driverId) => {
        try {
            const [rideinfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery_1.default.getScheduledRidesById(rideId),
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId)
            ]);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
