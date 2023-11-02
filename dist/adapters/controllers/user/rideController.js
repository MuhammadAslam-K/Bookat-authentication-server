"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRideUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userRideUseCase"));
exports.default = {
    getDriverDetails: async (req, res) => {
        try {
            if (typeof req.query.driverId === "string") {
                res.json(await userRideUseCase_1.default.getDriverDetailsAndFeedbacks(req.query.driverId));
            }
            else {
                res.status(400).json({ error: "Invalid driverId parameter" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getRideData: async (req, res) => {
        try {
            const rideId = req.query.id;
            res.json(await userRideUseCase_1.default.getRideDetails(rideId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    ridesHistory: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.getUserRidesHistory(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    currentRide: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.getCurrentRide(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    favouriteRide: async (req, res) => {
        try {
            const rideId = req.query.id;
            res.json(await userRideUseCase_1.default.addFavouriteRide(rideId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getQuickRideInfo: async (req, res) => {
        try {
            const rideId = req.query.id;
            res.json(await userRideUseCase_1.default.getRideInfoWithID(rideId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
