"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rideEntites_1 = __importDefault(require("../../entites/rideEntites"));
exports.default = {
    saveRideInfo: async (data) => {
        try {
            const newRide = new rideEntites_1.default({
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
            });
            return await newRide.save();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
// [1] data in usecase {
//     [1]   toLocationLat: 13.083694,
//     [1]   toLocationLong: 80.270186,
//     [1]   fromLocationLat: 12.992112,
//     [1]   fromLocationLong: 77.588446,
//     [1]   userFromLocation: 'Bengaluru, Karnataka, India',
//     [1]   userToLocation: 'Chennai, Tamil Nadu, India',
//     [1]   driverLatitude: 12.9003968,
//     [1]   driverLongitude: 77.6507902,
//     [1]   rideDistance: '291',
//     [1]   amount: '29069'
// userId,
// driverId
//     [1] }
