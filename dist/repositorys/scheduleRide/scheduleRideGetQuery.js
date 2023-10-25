"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRideEntites_1 = __importDefault(require("../../entites/scheduledRideEntites"));
exports.default = {
    getScheduledRidesById: async (rideId) => {
        try {
            return await scheduledRideEntites_1.default.findById(rideId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRidesByUserId: async (userID) => {
        try {
            return await scheduledRideEntites_1.default.find({ user_id: userID });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRidesByDriverId: async (driverId) => {
        try {
            return await scheduledRideEntites_1.default.find({ driver_id: driverId }).sort({ pickUpDate: 1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getNotApprovedScheduleRides: async () => {
        try {
            return await scheduledRideEntites_1.default.find({ driverAccepted: "Pending" }).sort({ pickUpDate: 1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentScheduledRideForUser: async (userID) => {
        try {
            return await scheduledRideEntites_1.default.find({ user_id: userID, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentScheduledRideForDriver: async (driverId) => {
        try {
            return await scheduledRideEntites_1.default.find({ driver_id: driverId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
