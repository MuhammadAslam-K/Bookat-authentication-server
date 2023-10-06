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
const userRegistrationUseCase_1 = __importDefault(require("../../../useCase/userUseCase/userRegistrationUseCase"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield userRegistrationUseCase_1.default.registerUser(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    googleSignup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                name: req.body.displayName,
                email: req.body.email,
            };
            res.json(yield userRegistrationUseCase_1.default.googleSignUp(data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    checkUserExists: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            res.json(yield userRegistrationUseCase_1.default.checkUserExists(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
