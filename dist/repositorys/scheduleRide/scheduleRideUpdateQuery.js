"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRideEntites_1 = __importDefault(require("../../entites/scheduledRideEntites"));
exports.default = {
    driverAcceptedRide: async (driverId, rideId) => {
        try {
            await scheduledRideEntites_1.default.findByIdAndUpdate(rideId, {
                driver_id: driverId,
                driverAccepted: "Accepted"
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
    }
};
