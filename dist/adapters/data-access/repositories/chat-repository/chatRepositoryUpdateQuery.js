"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("../../models/chat"));
exports.default = {
    updateChat: async (chatId, message) => {
        try {
            return await chat_1.default.findByIdAndUpdate(chatId, {
                $push: {
                    messages: message
                },
            }, {
                new: true
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
