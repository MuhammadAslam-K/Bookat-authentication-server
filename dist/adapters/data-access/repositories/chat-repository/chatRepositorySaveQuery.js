"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("../../models/chat"));
exports.default = {
    createNewChat: async (data) => {
        try {
            const chat = new chat_1.default({
                rideId: data.rideId,
                messages: data.message
            });
            const result = await chat.save();
            console.log("result :", result);
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
