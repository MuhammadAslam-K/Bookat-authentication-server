"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user-model"));
const driver_model_1 = __importDefault(require("../../models/driver-model"));
const admin_model_1 = __importDefault(require("../../models/admin-model"));
exports.default = {
    blockUser: async (userId) => {
        try {
            const user = await user_model_1.default.findById(userId);
            if (user) {
                user.block = !user.block;
                return await user.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    blockDriver: async (driverId) => {
        try {
            const driver = await driver_model_1.default.findById(driverId);
            if (driver) {
                driver.block = !driver.block;
                return await driver.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    approveDriverInfo: async (driverId) => {
        try {
            await driver_model_1.default.findByIdAndUpdate(driverId, { 'driver.driverVerified': true }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    approveVehicleInfo: async (driverId) => {
        try {
            await driver_model_1.default.findByIdAndUpdate(driverId, { 'vehicle.vehicleVerified': true }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    addRevenu: async (amount) => {
        try {
            const admin = await admin_model_1.default.findOne();
            if (admin) {
                const addRevenu = admin.revenue;
                admin.revenue = addRevenu + amount;
                return await admin.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rejectPersonalInfo: async (id) => {
        try {
            await driver_model_1.default.findByIdAndUpdate(id, { 'driver.driverVerified': false }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rejectVehicleInfo: async (id) => {
        try {
            await driver_model_1.default.findByIdAndUpdate(id, { 'vehicle.vehicleVerified': false }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
