"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../../../business/errors/errorHandling");
const cab_model_1 = __importDefault(require("../../models/cab-model"));
exports.default = {
    updateCabArray: async (vehicleType, driverId) => {
        try {
            console.log(driverId);
            return await cab_model_1.default.findOneAndUpdate({ cabType: vehicleType }, {
                $addToSet: {
                    drivers: driverId
                }
            }, { new: true });
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    removeDriverId: async (vehicleType, driverId) => {
        try {
            console.log(driverId, vehicleType);
            return await cab_model_1.default.findOneAndUpdate({ cabType: vehicleType }, { $pull: { drivers: driverId } }, { new: true });
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
