"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userScheduleRideUseCase_1 = __importDefault(require("../../../useCase/userUseCase/userScheduleRideUseCase"));
exports.default = {
    scheduleRide: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.scheduleRide(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    scheduleRideHistory: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.getScheduleRideHistory(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
