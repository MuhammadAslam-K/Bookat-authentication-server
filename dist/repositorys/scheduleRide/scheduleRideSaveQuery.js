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
                vehicleTye: data.vehicle,
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
// [1] data {
//     [1]   vehicle: 'Prime',
//     [1]   amount: '28175',
//     [1]   fromLocation: 'Anekal, Karnataka, India',
//     [1]   toLocation: 'Chennai, Tamil Nadu, India',
//     [1]   distance: '282',
//     [1]   duration: 7.043752888807411,
//     [1]   fromLocationLat: 12.708637,
//     [1]   fromLocationLong: 77.699397,
//     [1]   toLocationLat: 13.083694,
//     [1]   toLocationLong: 80.270186,
//     [1]   selectedDateTime: '2023-10-24T13:14:30.755Z'
//     [1] }
