"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverProfileUseCase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverProfileUseCase"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
exports.default = {
    getDriverProfile: async (req, res) => {
        try {
            res.json(await driverProfileUseCase_1.default.getDriverProfile(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    driverAvailable: async (req, res) => {
        try {
            res.json(await driverRepositoryUpdateQuerys_1.default.changeDriverAvailablety(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateDriverProfile: async (req, res) => {
        try {
            res.json(await driverProfileUseCase_1.default.updateProfile(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
