"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
exports.default = {
    saveDriver: async (data, refferalCode) => {
        try {
            const driver = new driverEntites_1.default({
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
