import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import rideRepositoryUpdateQuery from "../../repositorys/rideRepository/rideRepositoryUpdateQuery"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery"
import adminRepositoryUpdateQuery from "../../repositorys/admin/adminRepositoryUpdateQuery"
import { handleError } from "../../infrastructure/common/errorHandling"
import cabrepositoryGetQuery from "../../repositorys/cabRepository/cabrepositoryGetQuery"

export default {
    getDriverById: async (driverId: ObjectId) => {
        try {
            return await driverRepositoryGetQuerys.findDriverWithId(driverId)
        } catch (error) {
            handleError(error as Error)
        }
    },

    getDriverDetailsAndFeedbacks: async (driverId: string) => {
        try {
            const [driverData, feedBacksOfQuickRide, feedBacksOfScheduledRides] = await Promise.all([
                driverRepositoryGetQuerys.findDriverWithId(driverId),
                rideRepositoryGetQuery.getFeedbacksWithDriverId(driverId),
                scheduleRideGetQuery.getFeedbacksWithDriverId(driverId),
            ])
            const feedBacks = [...feedBacksOfQuickRide, ...feedBacksOfScheduledRides]
            return { driverData, feedBacks }
        } catch (error) {
            handleError(error as Error)
        }
    },

    getRideDetails: async (rideId: string) => {
        try {
            const result = await rideRepositoryGetQuery.findRideWithId(rideId)
            if (!result) {
                const scheduledRide = await scheduleRideGetQuery.getScheduledRidesById(rideId)
                if (scheduledRide) {
                    return scheduledRide
                } else {
                    return null
                }
            } else {
                return result
            }
        } catch (error) {
            handleError(error as Error)
        }
    },

    payment: async (data: { driverId: ObjectId, rideId: ObjectId, rating: string, review: string, price: string }, userId: ObjectId) => {
        try {
            const priceInt = parseInt(data.price)
            const adminAmount = priceInt * 0.1
            const driverAmount = priceInt * 0.9;
            await Promise.all([
                userRepositoryUpdateQuery.updateTotalRide(userId),
                driverRepositoryUpdateQuerys.updateTotalRideAndRevenu(data.driverId, driverAmount, data.rideId),
                adminRepositoryUpdateQuery.addRevenu(adminAmount)
            ]);
            const result = await rideRepositoryUpdateQuery.updatePaymentInfo(data, adminAmount, driverAmount)
            if (!result) {
                const scheduledRide = await scheduleRideUpdateQuery.updatePaymentInfo(data, adminAmount, driverAmount)
                if (scheduledRide) {
                    return scheduledRide
                } else {
                    return null
                }
            }

        } catch (error) {
            handleError(error as Error)
        }
    },

    getUserRidesHistory: async (userId: ObjectId) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery.getRideWithUserId(userId),
                scheduleRideGetQuery.getScheduledRidesByUserId(userId)
            ])
            return { quickRides, scheduledRides }
        } catch (error) {
            handleError(error as Error)
        }
    },

    getCurrentRide: async (userId: ObjectId) => {
        try {
            const response = await rideRepositoryGetQuery.getCurrentRideForUser(userId)
            if (response.length == 0) {
                const scheduleRide = await scheduleRideGetQuery.getCurrentScheduledRideForUser(userId)
                if (scheduleRide.length == 0) {
                    return null
                } else {
                    return scheduleRide
                }
            } else {
                return response
            }

        } catch (error) {
            handleError(error as Error)
        }
    },

    getAllcabs: async () => {
        try {
            return cabrepositoryGetQuery.getAllTheCabs()
        } catch (error) {
            handleError(error as Error)
        }
    }
}


