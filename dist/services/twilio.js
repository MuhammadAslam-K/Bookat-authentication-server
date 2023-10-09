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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID
const accountSid = "AC27fb374a44e424ecfde5a06eaba2dcbe";
// const authToken = process.env.TWILIO_AUTH_TOKEN
const authToken = "7aa06a1bdcf3ec95c1061aa51c2f3226";
// const verifySid = process.env.TWILIO_VERIFY_SID || ""
const verifySid = "VA36b0a90b67572c230c2b3798c0e8048b";
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
            throw new Error(error.message);
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
            if (verifyResponse.valid) {
                return true;
            }
            else {
                return ({ message: "Invalid OTP", status: 401 });
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
