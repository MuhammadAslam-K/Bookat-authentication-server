"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cab_model_1 = __importDefault(require("../../models/cab-model"));
const errorHandling_1 = require("../../../../business/errors/errorHandling");
exports.default = {
    getAllTheCabs: async () => {
        try {
            return await cab_model_1.default.find();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    chekCabExistsWithCabName: async (cabType) => {
        try {
            return await cab_model_1.default.findOne({ cabType: cabType });
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getCabWithId: async (id) => {
        try {
            return await cab_model_1.default.findById(id);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
};
