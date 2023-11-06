"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"));
const rideRepositorySaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositorySaveQuery"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    getUser: async (userId) => {
        try {
            return (await userRepositoryGetQuery_1.default.getUserWithId(userId));
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    saveNewRide: async (data) => {
        try {
            const result = await driverRepositoryGetQuerys_1.default.findDriverWithId(data.driverId);
            if (!result?.driver.driverVerified && !result?.vehicle.vehicleVerified) {
                throw new Error("Driver is not verified");
            }
            const response = await rideRepositorySaveQuery_1.default.saveRideInfo(data);
            const driver = await driverRepositoryUpdateQuerys_1.default.changeTheRideStatus(response.driver_id);
            return response._id;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getDriverRideHistory: async (driverId) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery_1.default.getRideDetailsByDriverId(driverId),
                scheduleRideGetQuery_1.default.getScheduledRidesWithDriverId(driverId)
            ]);
            return { quickRides, scheduledRides };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    checkAvailableDrivers: async (driverId, durationInMinutes) => {
        try {
            const driver = await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
            const currentDateTime = new Date();
            const scheduledRides = driver?.scheduledRides;
            if (driver) {
                if (driver.isRiding) {
                    return false;
                }
                if (!driver.isAvailable) {
                    return false;
                }
                console.log("driver verifyed", driver.driver.driverVerified, driver.vehicle.vehicleVerified);
                if (!driver.driver.driverVerified && !driver.vehicle.vehicleVerified) {
                    return false;
                }
                for (const ride of scheduledRides) {
                    const startingTime = new Date(ride.startingTime);
                    const endingTime = new Date(ride.endingTime);
                    const requestedEndTime = new Date(currentDateTime.getTime() + durationInMinutes * 60000);
                    if ((currentDateTime >= startingTime && currentDateTime <= endingTime) ||
                        (currentDateTime <= startingTime && requestedEndTime >= startingTime)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getCurrentRide: async (driverId) => {
        try {
            const response = await rideRepositoryGetQuery_1.default.getCurrentRideForDriver(driverId);
            if (response.length == 0) {
                const scheduleRide = await scheduleRideGetQuery_1.default.getCurrentScheduledRideForDriver(driverId);
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
            (0, errorHandling_1.handleError)(error);
        }
    }
};
