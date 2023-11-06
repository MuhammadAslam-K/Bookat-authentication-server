import { ObjectId } from "mongoose"
import adminRepositoryGetQuerys from "../../../adapters/data-access/repositories/admin/adminRepositoryGetQuerys"
import adminRepositoryUpdateQuery from "../../../adapters/data-access/repositories/admin/adminRepositoryUpdateQuery"
import userRepositoryGetQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"
import rideRepositoryGetQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"
import { handleError } from "../../errors/errorHandling"


export default {
    getUsers: async () => {
        try {
            return await adminRepositoryGetQuerys.getAllUsers()
        } catch (error) {
            handleError(error as Error)
        }
    },

    blockUser: async (userId: string) => {
        try {
            return await adminRepositoryUpdateQuery.blockUser(userId)
        } catch (error) {
            handleError(error as Error)
        }
    },

    getRideHistoryWithUserId: async (userId: string) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery.getRideWithUserId(userId),
                scheduleRideGetQuery.getScheduledRidesByUserId(userId)
            ])
            return { quickRides, scheduledRides }
        } catch (error) {
            handleError(error as Error)
        }
    }
}