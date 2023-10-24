import { ObjectId } from "mongoose";
import ScheduleRideSchema from "../../entites/scheduledRideEntites";

export default {

    getScheduledRidesById: async (rideId: ObjectId) => {
        try {
            return await ScheduleRideSchema.findById(rideId)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getScheduledRidesByUserId: async (userID: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ user_id: userID })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getScheduledRidesByDriverId: async (driverId: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ driver_id: driverId })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getNotApprovedScheduleRides: async () => {
        try {
            return await ScheduleRideSchema.find({ driverAccepted: "Pending" })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
}