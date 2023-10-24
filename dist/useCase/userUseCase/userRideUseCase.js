"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const rideRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/rideRepository/rideRepositoryUpdateQuery"));
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
    payment: async (data, userId) => {
        try {
            const [updatedUser, updatedDriver, updatedRide] = await Promise.all([
                userRepositoryUpdateQuery_1.default.updateTotalRide(userId),
                driverRepositoryUpdateQuerys_1.default.updateTotalRide(data.driverId),
                rideRepositoryUpdateQuery_1.default.updatePaymentInfo(data)
            ]);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rides: async (userId) => {
        try {
            return await rideRepositoryGetQuery_1.default.getRides(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
// [1] data {
// [1]   vehicle: 'Prime',
// [1]   amount: '',
// [1]   fromLocation: 'Anekal, Karnataka, India',
// [1]   toLocation: 'Chennai, Tamil Nadu, India',
// [1]   distance: '282',
// [1]   duration: 7.043752888807411,
// [1]   fromLocationLat: 12.708637,
// [1]   fromLocationLong: 77.699397,
// [1]   toLocationLat: 13.083694,
// [1]   toLocationLong: 80.270186,
// [1]   selectedDateTime: null
// [1] }
