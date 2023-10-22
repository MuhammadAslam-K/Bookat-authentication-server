"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rideEntites_1 = __importDefault(require("../../entites/rideEntites"));
exports.default = {
    findRideWithId: async (rideId) => {
        try {
            return await rideEntites_1.default.findById(rideId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
