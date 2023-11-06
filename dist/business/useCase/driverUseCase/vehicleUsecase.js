"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const errorHandling_1 = require("../../errors/errorHandling");
const cabrepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery"));
const cabRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabRepositoryUpdateQuery"));
exports.default = {
    getVehicleInfo: async (driverId) => {
        try {
            const [cabs, vehicle] = await Promise.all([
                cabrepositoryGetQuery_1.default.getAllTheCabs(),
                driverRepositoryGetQuerys_1.default.getVehicleInfoWithDriverId(driverId)
            ]);
            return { cabs, vehicle };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    updateVehicleInfo: async (driverId, data) => {
        try {
            const response = await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
            if (response) {
                const existingVehicleType = response.vehicleDocuments.vehicleType;
                if (existingVehicleType != data.vehicleType) {
                    await Promise.all([
                        cabRepositoryUpdateQuery_1.default.updateCabArray(data.vehicleType, driverId),
                        cabRepositoryUpdateQuery_1.default.removeDriverId(existingVehicleType, driverId)
                    ]);
                }
            }
            return await driverRepositoryUpdateQuerys_1.default.updateVehicleInfo(data, driverId);
        }
        catch (error) {
            console.log(error);
            (0, errorHandling_1.handleError)(error);
        }
    }
};
