"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRideUseCase_1 = __importDefault(require("../../../useCase/userUseCase/userRideUseCase"));
exports.default = {
    getDriverData: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.getDriverById(req.body.driverId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getRideData: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.getRideDetails(req.body.rideId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    payment: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.payment(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rides: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.rides(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
