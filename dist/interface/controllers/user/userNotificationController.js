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
const twilio_1 = __importDefault(require("../../../services/twilio"));
const passwordRest_1 = __importDefault(require("../../../useCase/userUseCase/passwordRest"));
exports.default = {
    sendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield twilio_1.default.sendSMS(req.body.mobile));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    verifySMS: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield twilio_1.default.verifySMS(req.body.mobile, req.body.otp));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    resetPasswordLink: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield passwordRest_1.default.sendRestPasswordLink(req.body.email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    resetpassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(yield passwordRest_1.default.resetPassword(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
