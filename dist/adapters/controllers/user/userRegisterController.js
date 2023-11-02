"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRegistrationUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userRegistrationUseCase"));
exports.default = {
    signup: async (req, res) => {
        try {
            res.json(await userRegistrationUseCase_1.default.registerUser(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    googleSignup: async (req, res) => {
        try {
            const data = {
                name: req.body.displayName,
                email: req.body.email,
            };
            res.json(await userRegistrationUseCase_1.default.googleSignUp(data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    checkUserExists: async (req, res) => {
        try {
            res.json(await userRegistrationUseCase_1.default.checkUserExists(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
