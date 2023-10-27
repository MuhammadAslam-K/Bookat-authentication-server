"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleRideSaveQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideSaveQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../repositorys/scheduleRide/scheduleRideGetQuery"));
exports.default = {
    scheduleRide: async (data, userId) => {
        try {
            return await scheduleRideSaveQuery_1.default.saveNewRide(data, userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduleRideHistory: async (userId) => {
        try {
            return await scheduleRideGetQuery_1.default.getScheduledRidesByUserId(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    getScheduledRideOfUser: async (userId) => {
        try {
            return await scheduleRideGetQuery_1.default.getPendingScheduledRidesWithUserId(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
