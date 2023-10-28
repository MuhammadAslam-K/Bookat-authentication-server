import { ObjectId } from "mongoose";
import scheduleRideSaveQuery from "../../repositorys/scheduleRide/scheduleRideSaveQuery";
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery";
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery";
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys";
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery";

export interface scheduleRideBookingData {
    vehicle: string;
    amount: string;
    fromLocation: string;
    toLocation: string;
    distance: string;
    duration: number;
    fromLocationLat: number;
    fromLocationLong: number;
    toLocationLat: number;
    toLocationLong: number;
    selectedDateTime: string;
}


export default {
    scheduleRide: async (data: scheduleRideBookingData, userId: ObjectId) => {
        try {
            return await scheduleRideSaveQuery.saveNewRide(data, userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    // getScheduleRideHistory: async (userId: ObjectId) => {
    //     try {
    //         return await scheduleRideGetQuery.getScheduledRidesByUserId(userId)
    //     } catch (error) {
    //         throw new Error((error as Error).message)
    //     }
    // },

    getScheduledRideOfUser: async (userId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.getPendingScheduledRidesWithUserId(userId)
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    cancelTheRide: async (data: { driverId: ObjectId, rideId: ObjectId }, userId: ObjectId) => {
        try {
            await Promise.all([
                scheduleRideUpdateQuery.cancelTheBookedRide(data.rideId),
                driverRepositoryUpdateQuerys.popUpTheScheduledRide(data.driverId, data.rideId),
                userRepositoryUpdateQuery.updateCancelledRides(userId)
            ]);
            return true
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}