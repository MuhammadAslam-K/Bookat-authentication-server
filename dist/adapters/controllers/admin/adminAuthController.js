"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminAuthUseCase_1 = __importDefault(require("../../../business/useCase/adminUseCase/adminAuthUseCase"));
exports.default = {
    signIn: async (req, res) => {
        try {
            res.json(await adminAuthUseCase_1.default.signIn(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
