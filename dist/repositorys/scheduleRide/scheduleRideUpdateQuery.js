"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRideEntites_1 = __importDefault(require("../../entites/scheduledRideEntites"));
exports.default = {
    driverAcceptedRide: async (driverId, rideId, latitude, longitude) => {
        try {
            await scheduledRideEntites_1.default.findByIdAndUpdate(rideId, {
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
            const response = await scheduledRideEntites_1.default.findByIdAndUpdate(rideId, { otpVerifyed: true }, { new: true });
            return response ? true : false;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    startRide: async (rideId) => {
        try {
            return await scheduledRideEntites_1.default.findByIdAndUpdate(rideId, { status: "Started" }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updatePaymentInfo: async (data) => {
        try {
            return await scheduledRideEntites_1.default.findByIdAndUpdate(data.rideId, {
                status: "Completed",
                feedback: data.review,
                rating: data.rating,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
