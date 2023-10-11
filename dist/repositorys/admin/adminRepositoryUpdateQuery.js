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
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
exports.default = {
    blockUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userEntites_1.default.findById(userId);
            if (user) {
                user.block = !user.block;
                return yield user.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockDriver: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const driver = yield driverEntites_1.default.findById(driverId);
            if (driver) {
                driver.block = !driver.block;
                return yield driver.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    approveDriverInfo: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield driverEntites_1.default.findByIdAndUpdate(driverId, { 'driver.driverVerified': true }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    approveVehicleInfo: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield driverEntites_1.default.findByIdAndUpdate(driverId, { 'vehicle.vehicleVerified': true }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
