"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRideUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userRideUseCase"));
exports.default = {
    getAllCabDetails: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.getAllcabs());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
