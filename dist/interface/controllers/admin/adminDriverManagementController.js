"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminDriverManagementUsecase_1 = __importDefault(require("../../../useCase/adminUseCase/adminDriverManagementUsecase"));
exports.default = {
    getDrivers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.getDrivers());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    blockDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.blockDriver(req.body.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getSingleDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.getSingleDriver(req.body.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    rejectDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.rejectDriverInfo(req.body.email, req.body.reason));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    rejectVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.rejectVehicleInfo(req.body.email, req.body.reason));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    approveDriver: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.approveDriverInfo(req.body.id, req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    approveVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield adminDriverManagementUsecase_1.default.approveVehicleInfo(req.body.id, req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
