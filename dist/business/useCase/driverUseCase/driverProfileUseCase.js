"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    getDriverProfile: async (driverId) => {
        try {
            return (await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId));
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    updateProfile: async (data, driverId) => {
        try {
            return (await driverRepositoryUpdateQuerys_1.default.updateDriverProfile(data, driverId));
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
