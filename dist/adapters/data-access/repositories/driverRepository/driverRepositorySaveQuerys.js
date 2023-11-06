"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_model_1 = __importDefault(require("../../models/driver-model"));
exports.default = {
    saveDriver: async (data, refferalCode) => {
        try {
            const driver = new driver_model_1.default({
                ...data,
                refrel: refferalCode
            });
            return await driver.save();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
