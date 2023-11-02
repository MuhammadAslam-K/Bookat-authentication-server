"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userScheduleRideUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userScheduleRideUseCase"));
exports.default = {
    scheduleNewRide: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.scheduleRide(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    scheduledRides: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.getScheduledRideOfUser(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    cancelride: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.cancelTheRide(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    reScheduleTheRide: async (req, res) => {
        try {
            res.json(await userScheduleRideUseCase_1.default.reScheduleRideWithRideId(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
