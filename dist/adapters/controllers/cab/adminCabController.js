"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminCabUseCase_1 = __importDefault(require("../../../business/useCase/cabUseCase/adminCabUseCase"));
exports.default = {
    showCabs: async (req, res) => {
        try {
            res.json(await adminCabUseCase_1.default.listAllTheCabs());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    addNewCab: async (req, res) => {
        try {
            res.json(await adminCabUseCase_1.default.addNewCab(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getcar: async (req, res) => {
        try {
            res.json(await adminCabUseCase_1.default.getTheCarWithId(req.params.id));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
