"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverAuthUseCase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverAuthUseCase"));
const driverRegistrationUsecase_1 = __importDefault(require("../../../business/useCase/driverUseCase/driverRegistrationUsecase"));
exports.default = {
    signup: async (req, res) => {
        try {
            res.json(await driverAuthUseCase_1.default.signup(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            res.json(await driverAuthUseCase_1.default.login(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveDriverInfo: async (req, res) => {
        try {
            res.json(await driverRegistrationUsecase_1.default.saveDriverInfo(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    saveVehicleInfo: async (req, res) => {
        try {
            res.json(await driverRegistrationUsecase_1.default.saveVehicleInfo(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    checkExists: async (req, res) => {
        try {
            res.json(await driverAuthUseCase_1.default.checkDriverExists(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
