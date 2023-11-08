"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRideUseCase_1 = __importDefault(require("../../../business/useCase/userUseCase/userRideUseCase"));
exports.default = {
    payment: async (req, res) => {
        try {
            res.json(await userRideUseCase_1.default.payment(req.body, req.token.data));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    review: async (req, res) => {
        try {
            console.log("data", req.body);
            res.json(await userRideUseCase_1.default.submitReview(req.body));
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    },
};
