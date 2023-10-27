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
    getRides: async (userId) => {
        try {
            return await rideEntites_1.default.find({ user_id: userId, status: "Completed" }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getRideDetailsByDriverId: async (driverId) => {
        try {
            return await rideEntites_1.default.find({ driver_id: driverId, status: "Completed" }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentRideForUser: async (userId) => {
        try {
            return await rideEntites_1.default.find({ user_id: userId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getCurrentRideForDriver: async (driverId) => {
        try {
            return await rideEntites_1.default.find({ driver_id: driverId, status: "Started" });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
