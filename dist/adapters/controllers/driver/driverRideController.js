"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRideUseCase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverRideUseCase"));
exports.default = {
    getUserWithId: async (req, res) => {
        try {
            const userId = req.query.id;
            res.json(await driverRideUseCase_1.default.getUser(userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getRideHistory: async (req, res) => {
        try {
            res.json(await driverRideUseCase_1.default.getDriverRideHistory(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    currentRide: async (req, res) => {
        try {
            res.json(await driverRideUseCase_1.default.getCurrentRide(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
