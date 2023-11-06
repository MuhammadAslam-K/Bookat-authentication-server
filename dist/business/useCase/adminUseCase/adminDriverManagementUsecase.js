"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryGetQuerys"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryUpdateQuery"));
const nodeMailer_1 = __importDefault(require("../../../adapters/external-services/email/nodeMailer"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
exports.default = {
    getDrivers: async () => {
        try {
            return await adminRepositoryGetQuerys_1.default.getAllDriver();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    blockDriver: async (driverId) => {
        try {
            // const driverId = new mongoose.Types.ObjectId(driver);
            return await adminRepositoryUpdateQuery_1.default.blockDriver(driverId);
        }
        catch (error) {
            console.log(error);
            (0, errorHandling_1.handleError)(error);
        }
    },
    getDriverWithId: async (driverId) => {
        try {
            return driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    rejectDriverInfo: async (email, id, reason) => {
        try {
            await adminRepositoryUpdateQuery_1.default.rejectPersonalInfo(id);
            const data = {
                to: email,
                subject: "Admin Rejected Your Personal Information Please Resubmit it.",
                message: reason
            };
            return await nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    rejectVehicleInfo: async (email, id, reason) => {
        try {
            await adminRepositoryUpdateQuery_1.default.rejectVehicleInfo(id);
            const data = {
                to: email,
                subject: "Admin Rejected Your Vehicle Information Please Resubmit it.",
                message: reason
            };
            return await nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
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
            (0, errorHandling_1.handleError)(error);
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
            (0, errorHandling_1.handleError)(error);
        }
    },
    getDriverRideHistory: async (driverId) => {
        try {
            const [quickRides, scheduleRides] = await Promise.all([
                rideRepositoryGetQuery_1.default.getRidesWithDriverId(driverId),
                scheduleRideGetQuery_1.default.getScheduledRidesWithDriverId(driverId),
            ]);
            return { quickRides, scheduleRides };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
