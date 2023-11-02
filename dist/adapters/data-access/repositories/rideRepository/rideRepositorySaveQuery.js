"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quickRide_model_1 = __importDefault(require("../../models/quickRide-model"));
exports.default = {
    saveRideInfo: async (data) => {
        try {
            const newRide = new quickRide_model_1.default({
                driver_id: data.driverId,
                user_id: data.userId,
                pickupCoordinates: {
                    latitude: data.fromLocationLat,
                    longitude: data.fromLocationLong
                },
                dropoffCoordinates: {
                    latitude: data.toLocationLat,
                    longitude: data.toLocationLong
                },
                pickupLocation: data.userFromLocation,
                dropoffLocation: data.userToLocation,
                driverCoordinates: {
                    latitude: data.driverLatitude,
                    longitude: data.driverLongitude
                },
                distance: data.rideDistance,
                price: data.amount,
                vehicleType: data.userVehicleType,
            });
            return await newRide.save();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
