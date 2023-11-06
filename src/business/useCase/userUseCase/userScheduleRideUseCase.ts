import { ObjectId } from "mongoose";
import scheduleRideSaveQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideSaveQuery";
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery";
import scheduleRideUpdateQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery";
import driverRepositoryUpdateQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys";
import userRepositoryUpdateQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery";
import { handleError } from "../../errors/errorHandling";

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
            handleError(error as Error)
        }
    },

    getScheduledRideOfUser: async (userId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.getPendingScheduledRidesWithUserId(userId)
        } catch (error) {
            handleError(error as Error);

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
            handleError(error as Error);
        }
    },

    reScheduleRideWithRideId: async (data: { rideId: string; selectedDateTime: string }) => {
        try {
            const result = await scheduleRideGetQuery.getScheduledRidesById(data.rideId)
            if (result) {
                result.pickUpDate = data.selectedDateTime
                await scheduleRideSaveQuery.rescheduleTheRide(result)
                return true
            }
        } catch (error) {
            handleError(error as Error)
        }
    }
}