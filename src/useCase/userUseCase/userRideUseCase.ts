import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import rideRepositoryUpdateQuery from "../../repositorys/rideRepository/rideRepositoryUpdateQuery"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery"

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
            console.log("rideId", rideId)
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
            throw new Error((error as Error).message)
        }
    },

    payment: async (data: { driverId: ObjectId, rideId: ObjectId, rating: string, review: string }, userId: ObjectId) => {
        try {
            await Promise.all([
                userRepositoryUpdateQuery.updateTotalRide(userId),
                driverRepositoryUpdateQuerys.updateTotalRide(data.driverId),
                driverRepositoryUpdateQuerys.changeTheRideStatus(data.driverId),
            ]);
            const result = await rideRepositoryUpdateQuery.updatePaymentInfo(data)
            if (!result) {
                const scheduledRide = await scheduleRideUpdateQuery.updatePaymentInfo(data)
                if (scheduledRide) {
                    return scheduledRide
                } else {
                    return null
                }
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    rides: async (userId: ObjectId) => {
        try {
            return await rideRepositoryGetQuery.getRides(userId)
        } catch (error) {
            throw new Error((error as Error).message)
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
            throw new Error((error as Error).message)
        }
    }
}


