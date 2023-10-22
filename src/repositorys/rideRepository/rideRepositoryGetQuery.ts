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
}