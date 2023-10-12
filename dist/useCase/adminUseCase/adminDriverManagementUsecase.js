"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/admin/adminRepositoryGetQuerys"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/admin/adminRepositoryUpdateQuery"));
const nodeMailer_1 = __importDefault(require("../../services/nodeMailer"));
exports.default = {
    getDrivers: async () => {
        try {
            return await adminRepositoryGetQuerys_1.default.getAllDriver();
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    blockDriver: async (driverId) => {
        try {
            return await adminRepositoryUpdateQuery_1.default.blockDriver(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getSingleDriver: async (driverId) => {
        try {
            return await adminRepositoryGetQuerys_1.default.getSingleDriver(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rejectDriverInfo: async (email, reason) => {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Personal Information Please Resubmit it.",
                message: reason
            };
            return await nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rejectVehicleInfo: async (email, reason) => {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Vehicle Information Please Resubmit it.",
                message: reason
            };
            return await nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    approveDriverInfo: async (driverId, email) => {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your personal information had been verifyed and Approved"
            };
            await nodeMailer_1.default.sendEmail(data);
            await adminRepositoryUpdateQuery_1.default.approveDriverInfo(driverId);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    approveVehicleInfo: async (driverId, email) => {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your Vehicle information had been verifyed and Approved"
            };
            await nodeMailer_1.default.sendEmail(data);
            await adminRepositoryUpdateQuery_1.default.approveVehicleInfo(driverId);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
