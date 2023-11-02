"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSignInUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userSignInUseCase"));
exports.default = {
    signin: async (req, res) => {
        try {
            res.json(await userSignInUseCase_1.default.validateUser(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    googleSignin: async (req, res) => {
        try {
            res.json(await userSignInUseCase_1.default.checkuserExists(req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
