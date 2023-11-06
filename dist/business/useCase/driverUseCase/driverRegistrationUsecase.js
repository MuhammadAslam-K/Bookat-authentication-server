"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const errorHandling_1 = require("../../errors/errorHandling");
const cabRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabRepositoryUpdateQuery"));
exports.default = {
    saveDriverInfo: async (data, driverId) => {
        try {
            const aadharidExists = await driverRepositoryGetQuerys_1.default.findDriverWithAadharId(data.aadharId);
            if (!aadharidExists) {
                const drivingLicenseIdExists = await driverRepositoryGetQuerys_1.default.findDriverWithDrivingLicenseId(data.drivingLicenseId);
                if (!drivingLicenseIdExists) {
                    return await driverRepositoryUpdateQuerys_1.default.updateDriverInfo(data, driverId);
                }
                else {
                    throw new Error("License Id already Exists please Re-check !!");
                }
            }
            else {
                throw new Error("Aadhar Id already Exists please Re-check !!");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    saveVehicleInfo: async (data, driverId) => {
        try {
            const rcExists = await driverRepositoryGetQuerys_1.default.findVehicleWithRcNo(data.registrationId);
            if (!rcExists) {
                await Promise.all([
                    cabRepositoryUpdateQuery_1.default.updateCabArray(data.vehicleType, driverId),
                    driverRepositoryUpdateQuerys_1.default.updateVehicleInfo(data, driverId)
                ]);
            }
            else {
                throw new Error("Registration No already Exists please Re-check !!");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
};
