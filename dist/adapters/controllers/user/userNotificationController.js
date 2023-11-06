"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("../../external-services/sms/twilio"));
const passwordRest_1 = __importDefault(require("../../../business/useCase/userUseCase/passwordRest"));
exports.default = {
    sendOtp: async (req, res) => {
        try {
            res.json(await twilio_1.default.sendSMS(req.body.mobile));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    verifySMS: async (req, res) => {
        try {
            res.json(await twilio_1.default.verifySMS(req.body.mobile, req.body.otp));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    resetPasswordLink: async (req, res) => {
        try {
            res.json(await passwordRest_1.default.sendRestPasswordLink(req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    resetpassword: async (req, res) => {
        try {
            res.json(await passwordRest_1.default.resetPassword(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
