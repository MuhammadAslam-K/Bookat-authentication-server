"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryGetQuery"));
exports.default = {
    getDriverById: async (driverId) => {
        try {
            return await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideDetails: async (rideId) => {
        try {
            return await rideRepositoryGetQuery_1.default.findRideWithId(rideId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
