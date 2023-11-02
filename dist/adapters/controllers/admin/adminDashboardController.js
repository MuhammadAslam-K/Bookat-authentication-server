"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminDashboardUseCase_1 = __importDefault(require("../../../business/useCase/adminUseCase/adminDashboardUseCase"));
exports.default = {
    dashboard: async (req, res) => {
        try {
            res.json(await adminDashboardUseCase_1.default.dashboardData());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
