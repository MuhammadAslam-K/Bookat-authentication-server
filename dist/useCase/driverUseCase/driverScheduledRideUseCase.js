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
    //     [1] data {
    // [1]   rideId: '653b799431b780c6d72414fc',
    // [1]   latitude: 13.0826802,
    // [1]   longitude: 80.2707184
    // [1] }
    driverAcceptScheduledRide: async (data, driverId) => {
        try {
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery_1.default.getScheduledRidesById(data.rideId),
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
                await driverRepositoryUpdateQuerys_1.default.addScheduledRide(data.rideId, newRidePickupDate, rideInfo.duration, driverId);
                // const latNum = parseInt(data.latitude)
                // const longNum = parseInt(data.longitude)
                await scheduleRideUpdateQuery_1.default.driverAcceptedRide(driverId, data.rideId, data.latitude, data.longitude);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getPendingScheduledRides: async (driverId) => {
        try {
            return await scheduleRideGetQuery_1.default.findPendingScheduledRidesWithDriverId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
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
            throw new Error(error.message);
        }
    }
};
