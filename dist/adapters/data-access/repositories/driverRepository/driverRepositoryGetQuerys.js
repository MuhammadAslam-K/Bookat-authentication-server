"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_model_1 = __importDefault(require("../../models/driver-model"));
exports.default = {
    getDriver: async (field, data) => {
        try {
            const query = {};
            query[field] = data;
            return await driver_model_1.default.find(query);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    findDriverWithAadharId: async (aadharId) => {
        try {
            return await driver_model_1.default.findOne({ 'aadhar.aadharId': aadharId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    findDriverWithDrivingLicenseId: async (drivingLicenseId) => {
        try {
            return await driver_model_1.default.findOne({ 'license.licenseId': drivingLicenseId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    findVehicleWithRcNo: async (rcNo) => {
        try {
            return await driver_model_1.default.findOne({ 'registration.registrationId': rcNo });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    findDriverWithId: async (driverId) => {
        try {
            return await driver_model_1.default.findById(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getVehicleInfoWithDriverId: async (driverId) => {
        try {
            return await driver_model_1.default.findById(driverId, 'vehicleDocuments');
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getAllDrivers: async () => {
        try {
            return await driver_model_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
