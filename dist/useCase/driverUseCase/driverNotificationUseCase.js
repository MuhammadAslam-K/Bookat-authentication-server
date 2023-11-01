"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("../../infrastructure/sms/twilio"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideUpdateQuery"));
const rideRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryUpdateQuery"));
const errorHandling_1 = require("../../infrastructure/common/errorHandling");
exports.default = {
    verifyotp: async (data) => {
        try {
            const response = await twilio_1.default.verifySMS(data.mobile, data.otp);
            if (response) {
                console.log("resonse", response);
                const scheduleRideResponse = await scheduleRideUpdateQuery_1.default.updateOtp(data.rideId);
                console.log("scheduleRideResponse", scheduleRideResponse);
                if (!scheduleRideResponse) {
                    const ride = await rideRepositoryUpdateQuery_1.default.updateOtp(data.rideId);
                    console.log("ride in", ride);
                }
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
