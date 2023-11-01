"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rideEntites_1 = __importDefault(require("../../entites/rideEntites"));
exports.default = {
    updatePaymentInfo: async (data, adminAmount, driverAmount) => {
        try {
            return await rideEntites_1.default.findByIdAndUpdate(data.rideId, {
                status: "Completed",
                feedback: data.review,
                rating: data.rating,
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
            return await rideEntites_1.default.findByIdAndUpdate(rideId, { otpVerifyed: true }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateFavouriteRide: async (rideId) => {
        try {
            const ride = await rideEntites_1.default.findById(rideId);
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
};
