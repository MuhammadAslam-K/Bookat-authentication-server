"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = (0, twilio_1.default)(accountSid, authToken);
exports.default = {
    sendSMS: async (mobile) => {
        return true;
        // const countryCode = 91;
        // if (verifySid) {
        //     try {
        //         await client.verify.v2
        //             .services(verifySid)
        //             .verifications.create({
        //                 to: `+${countryCode}${mobile}`,
        //                 channel: "sms",
        //             });
        //         return true
        //     } catch (error) {
        //         console.log("Error in sending SMS ", error);
        //         throw new Error((error as Error).message)
        //     }
        // }
    },
    verifySMS: async (mobile, otp) => {
        return true;
        // if (verifySid) {
        //     const countryCode = 91;
        //     try {
        //         const verifyResponse = await client.verify.v2
        //             .services(verifySid)
        //             .verificationChecks.create({
        //                 to: `+${countryCode}${mobile}`,
        //                 code: otp,
        //             });
        //         if (verifyResponse.valid) {
        //             return true
        //         }
        //         else {
        //             return ({ message: "Invalid OTP", status: 401 })
        //         }
        //     } catch (error) {
        //         console.log("Error in verifying SMS ", error);
        //         throw new Error((error as Error).message)
        //     }
        // }
    }
};
