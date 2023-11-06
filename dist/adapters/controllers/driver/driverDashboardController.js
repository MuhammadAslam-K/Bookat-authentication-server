"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverDashboardUseCase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverDashboardUseCase"));
exports.default = {
    dashboard: async (req, res) => {
        try {
            res.json(await driverDashboardUseCase_1.default.dashboardInfo(req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllCabs: async (req, res) => {
        try {
            res.json(await driverDashboardUseCase_1.default.listAllCabs());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
