import { ObjectId } from "mongoose"
import RideSchema from "../../entites/rideEntites"


export default {
    findRideWithId: async (rideId: ObjectId) => {
        try {
            return await RideSchema.findById(rideId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRides: async (userId: ObjectId) => {
        try {
            return await RideSchema.find({ user_id: userId, status: "Completed" }).sort({ date: -1 })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideDetailsByDriverId: async (driverId: ObjectId) => {
        try {
            return await RideSchema.find({ driver_id: driverId, status: "Completed" }).sort({ date: -1 })
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

}