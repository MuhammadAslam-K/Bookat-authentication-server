"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetPassword_1 = __importDefault(require("../../../business/useCase/driverUseCase/resetPassword"));
const driverNotificationUseCase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverNotificationUseCase"));
exports.default = {
    resetPasswordLink: async (req, res) => {
        try {
            res.json(await resetPassword_1.default.sendRestPasswordLink(req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    resetpassword: async (req, res) => {
        try {
            res.json(await resetPassword_1.default.resetPassword(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    verifyOTP: async (req, res) => {
        try {
            res.json(await driverNotificationUseCase_1.default.verifyotp(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
