"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverScheduledRideUseCase_1 = __importDefault(require("../../../useCase/driverUseCase/driverScheduledRideUseCase"));
exports.default = {
    getscheduleRideHistory: async (req, res) => {
        try {
            res.json(await driverScheduledRideUseCase_1.default.getScheduledRideHistoryByDriverId(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getScheduleRideNotification: async (req, res) => {
        try {
            res.json(await driverScheduledRideUseCase_1.default.getNotApprovedScheduleRides());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    confirmScheduledRide: async (req, res) => {
        try {
            res.json(await driverScheduledRideUseCase_1.default.driverAcceptScheduledRide(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    schedulePendingRides: async (req, res) => {
        try {
            res.json(await driverScheduledRideUseCase_1.default.getPendingScheduledRides(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    startScheduledRide: async (req, res) => {
        try {
            res.json(await driverScheduledRideUseCase_1.default.startScheduledRide(req.body.rideId, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
