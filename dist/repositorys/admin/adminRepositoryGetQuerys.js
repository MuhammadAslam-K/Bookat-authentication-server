"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminEntites_1 = __importDefault(require("../../entites/adminEntites"));
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
exports.default = {
    getAdminWithEmail: async (email) => {
        try {
            return await adminEntites_1.default.find({ email: email });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllUsers: async () => {
        try {
            return await userEntites_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllDriver: async () => {
        try {
            return await driverEntites_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getSingleDriver: async (driverId) => {
        try {
            return await driverEntites_1.default.findById(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
