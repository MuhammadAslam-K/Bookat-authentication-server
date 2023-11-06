import { ObjectId } from "mongoose"
import RideSchema from "../../models/quickRide-model"


export default {
    findRideWithId: async (rideId: string) => {
        try {
            return await RideSchema.findById(rideId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideWithUserId: async (userId: string) => {
        try {
            return await RideSchema.find({ user_id: userId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideDetailsByDriverId: async (driverId: string) => {
        try {
            return await RideSchema.find({ driver_id: driverId, status: { $in: ["Completed", "Cancelled"] } }).sort({ date: -1 })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getCurrentRideForUser: async (userId: ObjectId) => {
        try {
            return await RideSchema.find({ user_id: userId, status: "Started" })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getCurrentRideForDriver: async (driverId: ObjectId) => {
        try {
            return await RideSchema.find({ driver_id: driverId, status: "Started" })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getFeedbacksWithDriverId: async (driverId: string) => {
        try {
            const feedbacksAndRatings = await RideSchema.find({
                driver_id: driverId,
                feedback: { $ne: null },
                rating: { $ne: null }
            }).select('feedback rating');

            return feedbacksAndRatings;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRidesWithDriverId: async (driverId: string) => {
        try {
            return await RideSchema.find({ driver_id: driverId })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getAllQuickRides: async () => {
        try {
            return await RideSchema.find()
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }

}