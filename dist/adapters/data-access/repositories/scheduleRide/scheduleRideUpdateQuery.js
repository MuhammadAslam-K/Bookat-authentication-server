"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRide_model_1 = __importDefault(require("../../models/scheduledRide-model"));
exports.default = {
    driverAcceptedRide: async (driverId, rideId, latitude, longitude) => {
        try {
            await scheduledRide_model_1.default.findByIdAndUpdate(rideId, {
                driver_id: driverId,
                driverAccepted: "Accepted",
                'driverCoordinates.latitude': latitude,
                'driverCoordinates.longitude': longitude
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateOtp: async (rideId) => {
        try {
            const response = await scheduledRide_model_1.default.findByIdAndUpdate(rideId, { otpVerifyed: true }, { new: true });
            return response ? true : false;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    startRide: async (rideId) => {
        try {
            return await scheduledRide_model_1.default.findByIdAndUpdate(rideId, { status: "Started" }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updatePaymentInfo: async (data, adminAmount, driverAmount) => {
        try {
            return await scheduledRide_model_1.default.findByIdAndUpdate(data.rideId, {
                status: "Completed",
                adminRevenu: adminAmount,
                driverRevenu: driverAmount,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    cancelTheBookedRide: async (rideId) => {
        try {
            return await scheduledRide_model_1.default.findByIdAndUpdate(rideId, { status: "Cancelled" }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateFavouriteRide: async (rideId) => {
        try {
            const ride = await scheduledRide_model_1.default.findById(rideId);
            if (ride) {
                ride.favourite = !ride.favourite;
                await ride.save();
                return true;
            }
            return false;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    submitReview: async (data) => {
        try {
            return await scheduledRide_model_1.default.findByIdAndUpdate(data.rideId, {
                feedback: data.review,
                rating: data.rating
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
