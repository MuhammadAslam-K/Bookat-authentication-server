"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"));
const chatRepositorySaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"));
const chatRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"));
exports.default = {
    saveChat: async (data) => {
        try {
            const checkChatExists = await chatRepositoryGetQuery_1.default.getChatByRideId(data.rideId);
            if (checkChatExists) {
                await chatRepositoryUpdateQuery_1.default.updateChat(checkChatExists._id, data.message);
            }
            else {
                await chatRepositorySaveQuery_1.default.createNewChat(data);
            }
            return true;
        }
        catch (error) {
            console.log(error);
        }
    },
    getChatByRideId: async (rideId) => {
        try {
            const response = await chatRepositoryGetQuery_1.default.getChatByRideId(rideId);
            return response?.messages;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
