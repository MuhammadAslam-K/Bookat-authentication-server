"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduledRideEntites_1 = __importDefault(require("../../entites/scheduledRideEntites"));
exports.default = {
    saveNewRide: async (data, userId) => {
        try {
            const ride = new scheduledRideEntites_1.default({
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
    }
};
