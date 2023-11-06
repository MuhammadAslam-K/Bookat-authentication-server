"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminDriverManagementUsecase_1 = __importDefault(require("../../../business/useCase/adminUseCase/adminDriverManagementUsecase"));
exports.default = {
    getDrivers: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.getDrivers());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    blockDriver: async (req, res) => {
        try {
            const driverId = req.query.id;
            res.json(await adminDriverManagementUsecase_1.default.blockDriver(driverId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getDriverWithId: async (req, res) => {
        try {
            const driverId = req.query.id;
            res.json(await adminDriverManagementUsecase_1.default.getDriverWithId(driverId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rejectDriverInfo: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.rejectDriverInfo(req.body.email, req.body.id, req.body.reason));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rejectVehicleInfo: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.rejectVehicleInfo(req.body.email, req.body.id, req.body.reason));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    approveDriver: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.approveDriverInfo(req.body.id, req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    approveVehicle: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.approveVehicleInfo(req.body.id, req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getDriverRideHistory: async (req, res) => {
        try {
            const driverId = req.query.id;
            res.json(await adminDriverManagementUsecase_1.default.getDriverRideHistory(driverId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
