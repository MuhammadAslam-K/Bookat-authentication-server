import { ObjectId } from "mongoose";
import scheduleRideSaveQuery from "../../repositorys/scheduleRide/scheduleRideSaveQuery";
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery";

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

    getScheduleRideHistory: async (userId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.getScheduledRidesByUserId(userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getScheduledRideOfUser: async (userId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.getPendingScheduledRidesWithUserId(userId)
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}