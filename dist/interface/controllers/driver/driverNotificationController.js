"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetPassword_1 = __importDefault(require("../../../useCase/driverUseCase/resetPassword"));
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
    }
};
