"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
const cabrepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery"));
exports.default = {
    dashboardInfo: async (driverId) => {
        try {
            const [driverData, quickRides, scheduledRides] = await Promise.all([
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId),
                rideRepositoryGetQuery_1.default.getRidesWithDriverId(driverId),
                scheduleRideGetQuery_1.default.getScheduledRidesWithDriverId(driverId)
            ]);
            const quickRidesCount = quickRides.length;
            const scheduledRidesCount = scheduledRides.length;
            return {
                driverData,
                quickRides,
                scheduledRides,
                quickRidesCount,
                scheduledRidesCount
            };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    listAllCabs: async () => {
        try {
            return await cabrepositoryGetQuery_1.default.getAllTheCabs();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
