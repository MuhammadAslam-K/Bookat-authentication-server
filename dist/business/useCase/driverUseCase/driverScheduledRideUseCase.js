"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    getNotApprovedScheduleRides: async () => {
        try {
            return await scheduleRideGetQuery_1.default.getNotApprovedScheduleRides();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    driverAcceptScheduledRide: async (data, driverId) => {
        try {
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery_1.default.getScheduledRideWithIdAndUserData(data.rideId),
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId)
            ]);
            if (rideInfo && driverInfo) {
                if (!driverInfo.vehicle.vehicleVerified && !driverInfo.driver.driverVerified) {
                    throw new Error("Your details are not still verified by the Admin");
                }
                const newRidePickupDate = new Date(rideInfo.pickUpDate);
                const newRideDuration = parseFloat(rideInfo.duration);
                const newRideEndingTime = new Date(newRidePickupDate.getTime() + (newRideDuration * 60 * 1000));
                for (const scheduledRide of driverInfo.scheduledRides) {
                    const scheduledRideStartingTime = new Date(scheduledRide.startingTime);
                    const scheduledRideDuration = parseFloat(scheduledRide.duration);
                    const scheduledRideEndingTime = new Date(scheduledRideStartingTime.getTime() + (scheduledRideDuration * 60 * 1000));
                    if ((newRidePickupDate >= scheduledRideStartingTime && newRidePickupDate <= scheduledRideEndingTime) ||
                        (newRideEndingTime >= scheduledRideStartingTime && newRideEndingTime <= scheduledRideEndingTime)) {
                        throw new Error("You already have a ride at that period.");
                    }
                }
                for (const scheduledRide of driverInfo.scheduledRides) {
                    const scheduledRideStartingTime = new Date(scheduledRide.startingTime);
                    const scheduledRideDuration = parseFloat(scheduledRide.duration);
                    const scheduledRideEndingTime = new Date(scheduledRideStartingTime.getTime() + (scheduledRideDuration * 60 * 1000));
                    if ((newRideEndingTime >= scheduledRideStartingTime && newRideEndingTime <= scheduledRideEndingTime)) {
                        throw new Error("You already have a ride that conflicts in duration.");
                    }
                }
                await Promise.all([
                    driverRepositoryUpdateQuerys_1.default.addScheduledRide(data.rideId, newRidePickupDate, rideInfo.duration, driverId),
                    scheduleRideUpdateQuery_1.default.driverAcceptedRide(driverId, data.rideId, data.latitude, data.longitude),
                ]);
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getPendingScheduledRides: async (driverId) => {
        try {
            return await scheduleRideGetQuery_1.default.findPendingScheduledRidesWithDriverId(driverId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    startScheduledRide: async (rideId, driverId) => {
        try {
            return await Promise.all([
                scheduleRideUpdateQuery_1.default.startRide(rideId),
                driverRepositoryUpdateQuerys_1.default.changeTheRideStatus(driverId)
            ]);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
