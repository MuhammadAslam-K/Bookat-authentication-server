"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quickRide_model_1 = __importDefault(require("../../models/quickRide-model"));
const errorHandling_1 = require("../../../../business/errors/errorHandling");
exports.default = {
    updatePaymentInfo: async (data, adminAmount, driverAmount) => {
        try {
            return await quickRide_model_1.default.findByIdAndUpdate(data.rideId, {
                status: "Completed",
                adminRevenu: adminAmount,
                driverRevenu: driverAmount,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateOtp: async (rideId) => {
        try {
            return await quickRide_model_1.default.findByIdAndUpdate(rideId, { otpVerifyed: true }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateFavouriteRide: async (rideId) => {
        try {
            const ride = await quickRide_model_1.default.findById(rideId);
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
            return await quickRide_model_1.default.findByIdAndUpdate(data.rideId, {
                feedback: data.review,
                rating: data.rating
            }, { new: true });
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
