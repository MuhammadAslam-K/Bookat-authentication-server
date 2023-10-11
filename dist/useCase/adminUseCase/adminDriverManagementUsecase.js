"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/admin/adminRepositoryGetQuerys"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/admin/adminRepositoryUpdateQuery"));
const nodeMailer_1 = __importDefault(require("../../services/nodeMailer"));
exports.default = {
    getDrivers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepositoryGetQuerys_1.default.getAllDriver();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockDriver: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepositoryUpdateQuery_1.default.blockDriver(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getSingleDriver: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepositoryGetQuerys_1.default.getSingleDriver(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    rejectDriverInfo: (email, reason) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Personal Information Please Resubmit it.",
                message: reason
            };
            return yield nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    rejectVehicleInfo: (email, reason) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Vehicle Information Please Resubmit it.",
                message: reason
            };
            return yield nodeMailer_1.default.sendEmail(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    approveDriverInfo: (driverId, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your personal information had been verifyed and Approved"
            };
            yield nodeMailer_1.default.sendEmail(data);
            yield adminRepositoryUpdateQuery_1.default.approveDriverInfo(driverId);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    approveVehicleInfo: (driverId, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your Vehicle information had been verifyed and Approved"
            };
            yield nodeMailer_1.default.sendEmail(data);
            yield adminRepositoryUpdateQuery_1.default.approveVehicleInfo(driverId);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
