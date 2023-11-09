"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../errors/errorHandling");
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const userRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"));
exports.default = {
    dashboardData: async () => {
        try {
            const [totalUsers, totalDrivers, totalQuickRides, totalScheduledRides] = await Promise.all([
                userRepositoryGetQuery_1.default.getAllUsers(),
                driverRepositoryGetQuerys_1.default.getAllDrivers(),
                rideRepositoryGetQuery_1.default.getAllQuickRides(),
                scheduleRideGetQuery_1.default.getAllScheduledRides(),
            ]);
            const totalUsersCount = totalUsers.length;
            const totalDriversCount = totalDrivers.length;
            const totalQuickRidesCount = totalQuickRides.length;
            const totalScheduledRidesCount = totalScheduledRides.length;
            const totalRidesCount = totalQuickRidesCount + totalScheduledRidesCount;
            return {
                totalUsersCount,
                totalDriversCount,
                totalQuickRidesCount,
                totalScheduledRidesCount,
                totalRidesCount,
                totalUsers,
                totalDrivers,
                totalQuickRides,
                totalScheduledRides
            };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
