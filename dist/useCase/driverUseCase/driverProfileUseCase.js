"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
exports.default = {
    getDriverProfile: async (driverId) => {
        try {
            return (await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId));
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateProfile: async (data, driverId) => {
        try {
            return (await driverRepositoryUpdateQuerys_1.default.updateDriverProfile(data, driverId));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
