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
const driverAuthUseCase_1 = __importDefault(require("../../../useCase/driverUseCase/driverAuthUseCase"));
const driverRegistrationUsecase_1 = __importDefault(require("../../../useCase/driverUseCase/driverRegistrationUsecase"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield driverAuthUseCase_1.default.signup(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield driverAuthUseCase_1.default.login(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    saveDriverInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield driverRegistrationUsecase_1.default.saveDriverInfo(req.body, req.token.userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    saveVehicleInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield driverRegistrationUsecase_1.default.saveVehicleInfo(req.body, req.token.userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
