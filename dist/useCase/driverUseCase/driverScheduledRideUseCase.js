"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideGetQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideGetQuery"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideUpdateQuery"));
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
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery_1.default.getScheduledRidesById(rideId),
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId)
            ]);
            if (rideInfo && driverInfo) {
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
                console.log("No conflicts detected. Driver can accept the ride.");
                await driverRepositoryUpdateQuerys_1.default.addScheduledRide(rideId, newRidePickupDate, rideInfo.duration, driverId);
                await scheduleRideUpdateQuery_1.default.driverAcceptedRide(driverId, rideId);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
