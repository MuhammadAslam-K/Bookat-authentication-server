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
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
exports.default = {
    findDriverWithEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.find({ email: email });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findDriverWithMobile: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.find({ mobile: mobile });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getDriverWithRefrelCode: (refrelCode) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.find({ refrel: refrelCode });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findDriverWithAadharId: (aadharId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findOne({ 'aadhar.aadharId': aadharId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findDriverWithDrivingLicenseId: (drivingLicenseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findOne({ 'license.licenseId': drivingLicenseId });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findVehicleWithRcNo: (rcNo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findOne({ 'registration.registrationId': rcNo });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
