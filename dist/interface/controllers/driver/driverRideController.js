"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRideUseCase_1 = __importDefault(require("../../../useCase/driverUseCase/driverRideUseCase"));
exports.default = {
    getUserWithId: async (req, res) => {
        try {
            res.json(await driverRideUseCase_1.default.getUser(req.body.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
