"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_js_1 = __importDefault(require("../../models/admin-model.js"));
const driver_model_js_1 = __importDefault(require("../../models/driver-model.js"));
const user_model_js_1 = __importDefault(require("../../models/user-model.js"));
exports.default = {
    getAdminWithEmail: async (email) => {
        try {
            return await admin_model_js_1.default.find({ email: email });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllUsers: async () => {
        try {
            return await user_model_js_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllDriver: async () => {
        try {
            return await driver_model_js_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
