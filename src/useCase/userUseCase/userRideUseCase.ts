import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"

export default {
    getDriverById: async (driverId: ObjectId) => {
        try {
            return await driverRepositoryGetQuerys.findDriverWithId(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideDetails: async (rideId: ObjectId) => {
        try {
            return await rideRepositoryGetQuery.findRideWithId(rideId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}