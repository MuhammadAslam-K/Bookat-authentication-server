"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("../../models/chat"));
exports.default = {
    getChatByRideId: async (rideId) => {
        try {
            return chat_1.default.findOne({ rideId: rideId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
