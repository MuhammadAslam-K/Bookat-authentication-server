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
const userSignInUseCase_1 = __importDefault(require("../../../useCase/userUseCase/userSignInUseCase"));
exports.default = {
    signin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield userSignInUseCase_1.default.validateUser(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    googleSignin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield userSignInUseCase_1.default.checkuserExists(req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
