import { ObjectId } from "mongoose";

import ScheduleRideSchema from "../../models/scheduledRide-model";

export default {

    getScheduledRidesById: async (rideId: string) => {
        try {
            return await ScheduleRideSchema.findById(rideId)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getScheduledRidesByUserId: async (userID: string) => {
        try {
            return await ScheduleRideSchema.find({
                user_id: userID,
                status: { $in: ["Completed", "Cancelled"] }
            })
                .sort({ pickUpDate: 1 })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getNotApprovedScheduleRides: async () => {
        try {
            console.log(29)
            return await ScheduleRideSchema.find({ driverAccepted: "Pending", status: "Pending" }).sort({ pickUpDate: 1 })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getCurrentScheduledRideForUser: async (userID: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ user_id: userID, status: "Started" })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getCurrentScheduledRideForDriver: async (driverId: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ driver_id: driverId, status: "Started" })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    findPendingScheduledRidesWithDriverId: async (driverId: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ driver_id: driverId, status: "Pending" })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getPendingScheduledRidesWithUserId: async (userId: ObjectId) => {
        try {
            return await ScheduleRideSchema.find({ user_id: userId, status: "Pending" })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getFeedbacksWithDriverId: async (driverId: string) => {
        try {
            const feedbacksAndRatings = await ScheduleRideSchema.find({
                driver_id: driverId,
                feedback: { $ne: null },
                rating: { $ne: null }
            }).select('feedback rating');

            return feedbacksAndRatings;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getScheduledRidesWithDriverId: async (driverId: string) => {
        try {
            return await ScheduleRideSchema.find({ driver_id: driverId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 })
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    getAllScheduledRides: async () => {
        try {
            return await ScheduleRideSchema.find()
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    getScheduledRideWithIdAndUserData: async (rideId: string) => {
        try {
            return await ScheduleRideSchema
                .findById(rideId)
                .populate('user_id')
                .exec();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}