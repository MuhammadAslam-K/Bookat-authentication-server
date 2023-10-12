"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
exports.default = {
    getVehicleInfo: async (driverId) => {
        try {
            return await driverRepositoryGetQuerys_1.default.getVehicleInfoWithDriverId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateVehicleInfo: async (driverId, data) => {
        try {
            return await driverRepositoryUpdateQuerys_1.default.updateVehicleInfo(data, driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
