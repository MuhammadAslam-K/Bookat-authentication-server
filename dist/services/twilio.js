"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const verifySid = process.env.TWILIO_VERIFY_SID || "";
const client = (0, twilio_1.default)(accountSid, authToken);
exports.default = {
    sendSMS: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        const countryCode = 91;
        try {
            yield client.verify.v2
                .services(verifySid)
                .verifications.create({
                to: `+${countryCode}${mobile}`,
                channel: "sms",
            });
            return true;
        }
        catch (error) {
            console.log("twilio", error);
        }
    }),
    verifySMS: (mobile, otp) => __awaiter(void 0, void 0, void 0, function* () {
        const countryCode = 91;
        try {
            const verifyResponse = yield client.verify.v2
                .services(verifySid)
                .verificationChecks.create({
                to: `+${countryCode}${mobile}`,
                code: otp,
            });
            console.log("verify sms", verifyResponse);
            if (verifyResponse.valid) {
                return true;
            }
            else {
                return ({ message: "Invalid OTP", status: 401 });
            }
        }
        catch (error) {
            console.log("verify sms", error);
            throw new Error(error.message);
        }
    })
};
