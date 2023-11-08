"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const rideRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const rideRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/rideRepository/rideRepositoryUpdateQuery"));
const scheduleRideGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"));
const scheduleRideUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery"));
const adminRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryUpdateQuery"));
const errorHandling_1 = require("../../errors/errorHandling");
const cabrepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery"));
const nodeMailer_1 = __importDefault(require("../../../adapters/external-services/email/nodeMailer"));
exports.default = {
    getDriverById: async (driverId) => {
        try {
            return await driverRepositoryGetQuerys_1.default.findDriverWithId(driverId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getDriverDetailsAndFeedbacks: async (driverId) => {
        try {
            const [driverData, feedBacksOfQuickRide, feedBacksOfScheduledRides] = await Promise.all([
                driverRepositoryGetQuerys_1.default.findDriverWithId(driverId),
                rideRepositoryGetQuery_1.default.getFeedbacksWithDriverId(driverId),
                scheduleRideGetQuery_1.default.getFeedbacksWithDriverId(driverId),
            ]);
            const feedBacks = [...feedBacksOfQuickRide, ...feedBacksOfScheduledRides];
            return { driverData, feedBacks };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getRideDetails: async (rideId) => {
        try {
            const result = await rideRepositoryGetQuery_1.default.findRideWithId(rideId);
            if (!result) {
                const scheduledRide = await scheduleRideGetQuery_1.default.getScheduledRidesById(rideId);
                if (scheduledRide) {
                    return scheduledRide;
                }
                else {
                    return null;
                }
            }
            else {
                return result;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    payment: async (data, userId) => {
        try {
            const priceInt = parseInt(data.price);
            const adminAmount = priceInt * 0.1;
            const driverAmount = priceInt * 0.9;
            const [user, driver, admin] = await Promise.all([
                userRepositoryUpdateQuery_1.default.updateTotalRide(userId),
                driverRepositoryUpdateQuerys_1.default.updateTotalRideAndRevenu(data.driverId, driverAmount, data.rideId),
                adminRepositoryUpdateQuery_1.default.addRevenu(adminAmount)
            ]);
            const result = await rideRepositoryUpdateQuery_1.default.updatePaymentInfo(data, adminAmount, driverAmount);
            let scheduledRide;
            if (!result) {
                scheduledRide = await scheduleRideUpdateQuery_1.default.updatePaymentInfo(data, adminAmount, driverAmount);
                if (!scheduledRide) {
                    return null;
                }
            }
            const emailInfo = {
                to: user?.email,
                subject: "Payment Successful",
                message: "Your Payment has been successful"
            };
            const emailData = {
                userName: user?.name,
                pickUpLocation: result ? result.pickupLocation : scheduledRide?.pickupLocation,
                dropOffLocation: result ? result.dropoffLocation : scheduledRide?.dropoffLocation,
                driverName: driver?.name,
                vehicleType: driver?.vehicleDocuments.vehicleModel,
                vehicleNo: driver?.vehicleDocuments.registration.registrationId,
                amount: result ? result.price : scheduledRide?.price
            };
            const emalResult = await nodeMailer_1.default.sendRideConfirmEmail(emailInfo, emailData);
            console.log(emalResult);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getUserRidesHistory: async (userId) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery_1.default.getRideWithUserId(userId),
                scheduleRideGetQuery_1.default.getScheduledRidesByUserId(userId)
            ]);
            const favoriteQuickRides = quickRides.filter(ride => ride.favourite === true);
            const favoritescheduledRides = scheduledRides.filter(ride => ride.favourite === true);
            const favouriteRides = [...favoriteQuickRides, ...favoritescheduledRides];
            return { quickRides, scheduledRides, favouriteRides };
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getCurrentRide: async (userId) => {
        try {
            const response = await rideRepositoryGetQuery_1.default.getCurrentRideForUser(userId);
            if (response.length == 0) {
                const scheduleRide = await scheduleRideGetQuery_1.default.getCurrentScheduledRideForUser(userId);
                if (scheduleRide.length == 0) {
                    return null;
                }
                else {
                    return scheduleRide;
                }
            }
            else {
                return response;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getAllcabs: async () => {
        try {
            return cabrepositoryGetQuery_1.default.getAllTheCabs();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    addFavouriteRide: async (rideId) => {
        try {
            const response = await rideRepositoryUpdateQuery_1.default.updateFavouriteRide(rideId);
            if (!response) {
                const scheduleRide = await scheduleRideUpdateQuery_1.default.updateFavouriteRide(rideId);
            }
            return true;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getRideInfoWithID: async (rideId) => {
        try {
            const response = await rideRepositoryGetQuery_1.default.findRideWithId(rideId);
            if (!response) {
                return await scheduleRideGetQuery_1.default.getScheduledRidesById(rideId);
            }
            return response;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    submitReview: async (data) => {
        try {
            const result = await rideRepositoryUpdateQuery_1.default.submitReview(data);
            if (!result) {
                await scheduleRideUpdateQuery_1.default.submitReview(data);
                return true;
            }
            else {
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
