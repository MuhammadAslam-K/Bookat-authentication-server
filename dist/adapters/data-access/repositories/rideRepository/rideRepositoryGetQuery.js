"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quickRide_model_1 = __importDefault(require("../../models/quickRide-model"));
exports.default = {
    findRideWithId: async (rideId) => {
        try {
            return await quickRide_model_1.default.findById(rideId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideWithUserId: async (userId) => {
        try {
            return await quickRide_model_1.default.find({ user_id: userId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideDetailsByDriverId: async (driverId) => {
        try {
            return await quickRide_model_1.default.find({ driver_id: driverId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentRideForUser: async (userId) => {
        try {
            return await quickRide_model_1.default.find({ user_id: userId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentRideForDriver: async (driverId) => {
        try {
            return await quickRide_model_1.default.find({ driver_id: driverId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getFeedbacksWithDriverId: async (driverId) => {
        try {
            const feedbacksAndRatings = await quickRide_model_1.default.find({
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
    getRidesWithDriverId: async (driverId) => {
        try {
            return await quickRide_model_1.default.find({ driver_id: driverId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllQuickRides: async () => {
        try {
            return await quickRide_model_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
