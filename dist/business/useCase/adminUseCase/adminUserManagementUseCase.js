"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryGetQuerys"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryUpdateQuery"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    getUsers: async () => {
        try {
            return await adminRepositoryGetQuerys_1.default.getAllUsers();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    blockUser: async (userId) => {
        try {
            return await adminRepositoryUpdateQuery_1.default.blockUser(userId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getRideHistoryWithUserId: async (userId) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery_1.default.getRideWithUserId(userId),
                scheduleRideGetQuery_1.default.getScheduledRidesByUserId(userId)
            ]);
            return { quickRides, scheduledRides };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
