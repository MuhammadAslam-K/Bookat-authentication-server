"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminUserManagementUseCase_1 = __importDefault(require("../../../business/useCase/adminUseCase/adminUserManagementUseCase"));
exports.default = {
    getuser: async (req, res) => {
        try {
            res.json(await adminUserManagementUseCase_1.default.getUsers());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    blockUser: async (req, res) => {
        try {
            const userId = req.query.id;
            res.json(await adminUserManagementUseCase_1.default.blockUser(userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getUserRideHistory: async (req, res) => {
        try {
            const userId = req.query.id;
            res.json(await adminUserManagementUseCase_1.default.getRideHistoryWithUserId(userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
