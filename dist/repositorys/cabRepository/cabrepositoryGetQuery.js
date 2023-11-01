"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cabEntites_1 = __importDefault(require("../../entites/cabEntites"));
const errorHandling_1 = require("../../infrastructure/common/errorHandling");
exports.default = {
    getAllTheCabs: async () => {
        try {
            return await cabEntites_1.default.find();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    chekCabExistsWithCabName: async (cabType) => {
        try {
            return await cabEntites_1.default.findOne({ cabType: cabType });
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getCabWithId: async (id) => {
        try {
            return await cabEntites_1.default.findById(id);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
};
