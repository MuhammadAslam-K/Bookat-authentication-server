"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rideEntites_1 = __importDefault(require("../../entites/rideEntites"));
exports.default = {
    updatePaymentInfo: async (data) => {
        try {
            await rideEntites_1.default.findByIdAndUpdate(data.rideId, {
                status: "Completed",
                paymentMode: "Cash",
                feedback: data.review,
                rating: data.rating,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateOtp: async (rideId) => {
        try {
            console.log("rideId = ", rideId);
            return await rideEntites_1.default.findByIdAndUpdate(rideId, { otpVerifyed: true }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
