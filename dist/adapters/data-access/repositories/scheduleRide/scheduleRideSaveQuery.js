"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRide_model_1 = __importDefault(require("../../models/scheduledRide-model"));
const errorHandling_1 = require("../../../../business/errors/errorHandling");
exports.default = {
    saveNewRide: async (data, userId) => {
        try {
            const ride = new scheduledRide_model_1.default({
                user_id: userId,
                price: data.amount,
                vehicleType: data.vehicle,
                'pickupCoordinates.latitude': data.fromLocationLat,
                'pickupCoordinates.longitude': data.fromLocationLong,
                'dropoffCoordinates.latitude': data.toLocationLat,
                'dropoffCoordinates.longitude': data.toLocationLong,
                pickupLocation: data.fromLocation,
                dropoffLocation: data.toLocation,
                distance: data.distance,
                pickUpDate: data.selectedDateTime,
                duration: data.duration
            });
            await ride.save();
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    rescheduleTheRide: async (data) => {
        console.log("data", data);
        try {
            const ride = new scheduledRide_model_1.default({
                user_id: data.user_id,
                price: data.price,
                vehicleType: data.vehicleType,
                'pickupCoordinates.latitude': data.pickupCoordinates.latitude,
                'pickupCoordinates.longitude': data.pickupCoordinates.longitude,
                'dropoffCoordinates.latitude': data.dropoffCoordinates.latitude,
                'dropoffCoordinates.longitude': data.dropoffCoordinates.longitude,
                pickupLocation: data.pickupLocation,
                dropoffLocation: data.dropoffLocation,
                distance: data.distance,
                pickUpDate: data.pickUpDate,
                duration: data.duration
            });
            await ride.save();
            return true;
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
