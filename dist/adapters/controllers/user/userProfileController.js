"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProfileUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userProfileUseCase"));
exports.default = {
    getProfile: async (req, res) => {
        try {
            res.json(await userProfileUseCase_1.default.getProfile(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            res.json(await userProfileUseCase_1.default.updateProfile(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
