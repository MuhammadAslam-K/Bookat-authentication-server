import { ObjectId } from "mongoose"
import adminRepositoryGetQuerys from "../../repositorys/admin/adminRepositoryGetQuerys"
import adminRepositoryUpdateQuery from "../../repositorys/admin/adminRepositoryUpdateQuery"
import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import { handleError } from "../../infrastructure/common/errorHandling"


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

    getRideHistoryWithUserId: async (userId: ObjectId) => {
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