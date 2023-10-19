"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
exports.default = {
    getUser: async (field, data) => {
        try {
            const query = {};
            query[field] = data;
            return await userEntites_1.default.find(query);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getUserWithId: async (userId) => {
        try {
            return await userEntites_1.default.findById(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
