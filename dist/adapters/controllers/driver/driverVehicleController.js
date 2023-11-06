"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicleUsecase_1 = __importDefault(require("../../../business/useCase/driverUseCase/vehicleUsecase"));
exports.default = {
    getVehicleInfo: async (req, res) => {
        try {
            res.json(await vehicleUsecase_1.default.getVehicleInfo(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateVehicleInfo: async (req, res) => {
        try {
            res.json(await vehicleUsecase_1.default.updateVehicleInfo(req.token.data, req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
