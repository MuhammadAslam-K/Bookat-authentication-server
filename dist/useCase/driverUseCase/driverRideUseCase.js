"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
const rideRepositorySaveQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositorySaveQuery"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryGetQuery"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
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
            const driver = await driverRepositoryUpdateQuerys_1.default.changeTheRideStatus(response.driver_id);
            return response._id;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideWithDriverId: async (driverId) => {
        try {
            return await rideRepositoryGetQuery_1.default.getRideDetailsByDriverId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    checkAvailableDrivers: async (driverId, durationInMinutes) => {
        try {
            const driver = await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
            const currentDateTime = new Date();
            const scheduledRides = driver?.scheduledRides;
            console.log("driver data", driver);
            if (driver) {
                // if (driver.isRiding) {
                //     return false
                // }
                if (!driver.isAvailable) {
                    return false;
                }
                for (const ride of scheduledRides) {
                    const startingTime = new Date(ride.startingTime);
                    const endingTime = new Date(ride.endingTime);
                    // Calculate the requested end time based on the current time and duration
                    const requestedEndTime = new Date(currentDateTime.getTime() + durationInMinutes * 60000);
                    // Check if the requested ride overlaps with the scheduled ride
                    if ((currentDateTime >= startingTime && currentDateTime <= endingTime) ||
                        (currentDateTime <= startingTime && requestedEndTime >= startingTime)) {
                        return false; // Overlapping rides
                    }
                }
                return true; // No overlapping rides, driver is available
            }
            return false; // Driver not found
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
