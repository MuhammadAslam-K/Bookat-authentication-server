"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRide_model_1 = __importDefault(require("../../models/scheduledRide-model"));
exports.default = {
    getScheduledRidesById: async (rideId) => {
        try {
            return await scheduledRide_model_1.default.findById(rideId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRidesByUserId: async (userID) => {
        try {
            return await scheduledRide_model_1.default.find({
                user_id: userID,
                status: { $in: ["Completed", "Cancelled"] }
            })
                .sort({ pickUpDate: 1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getNotApprovedScheduleRides: async () => {
        try {
            console.log(29);
            return await scheduledRide_model_1.default.find({ driverAccepted: "Pending", status: "Pending" }).sort({ pickUpDate: 1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentScheduledRideForUser: async (userID) => {
        try {
            return await scheduledRide_model_1.default.find({ user_id: userID, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentScheduledRideForDriver: async (driverId) => {
        try {
            return await scheduledRide_model_1.default.find({ driver_id: driverId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    findPendingScheduledRidesWithDriverId: async (driverId) => {
        try {
            return await scheduledRide_model_1.default.find({ driver_id: driverId, status: "Pending" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getPendingScheduledRidesWithUserId: async (userId) => {
        try {
            return await scheduledRide_model_1.default.find({ user_id: userId, status: "Pending" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getFeedbacksWithDriverId: async (driverId) => {
        try {
            const feedbacksAndRatings = await scheduledRide_model_1.default.find({
                driver_id: driverId,
                feedback: { $ne: null },
                rating: { $ne: null }
            }).select('feedback rating');
            return feedbacksAndRatings;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRidesWithDriverId: async (driverId) => {
        try {
            return await scheduledRide_model_1.default.find({ driver_id: driverId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllScheduledRides: async () => {
        try {
            return await scheduledRide_model_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRideWithIdAndUserData: async (rideId) => {
        try {
            return await scheduledRide_model_1.default
                .findById(rideId)
                .populate('user_id')
                .exec();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
