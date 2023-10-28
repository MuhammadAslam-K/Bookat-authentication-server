"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminDriverManagementUsecase_1 = __importDefault(require("../../../useCase/adminUseCase/adminDriverManagementUsecase"));
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
            res.json(await adminDriverManagementUsecase_1.default.blockDriver(req.body.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSingleDriver: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.getSingleDriver(req.body.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rejectDriver: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.rejectDriverInfo(req.body.email, req.body.reason));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    rejectVehicle: async (req, res) => {
        try {
            res.json(await adminDriverManagementUsecase_1.default.rejectVehicleInfo(req.body.email, req.body.reason));
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
            res.json(await adminDriverManagementUsecase_1.default.getDriverRideHistory(req.body.driverId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
