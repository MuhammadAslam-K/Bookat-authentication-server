import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"
import rideRepositoryGetQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery"
import userRepositoryUpdateQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery"
import driverRepositoryUpdateQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"
import rideRepositoryUpdateQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryUpdateQuery"
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"
import scheduleRideUpdateQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery"
import adminRepositoryUpdateQuery from "../../../adapters/data-access/repositories/admin/adminRepositoryUpdateQuery"
import { handleError } from "../../errors/errorHandling"
import cabrepositoryGetQuery from "../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery"
import nodeMailer from "../../../adapters/external-services/email/nodeMailer"

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

    payment: async (data: { driverId: ObjectId, rideId: ObjectId, price: string }, userId: ObjectId) => {
        try {
            const priceInt = parseInt(data.price)
            const adminAmount = priceInt * 0.1
            const driverAmount = priceInt * 0.9;

            const [user, driver, admin] = await Promise.all([
                userRepositoryUpdateQuery.updateTotalRide(userId),
                driverRepositoryUpdateQuerys.updateTotalRideAndRevenu(data.driverId, driverAmount, data.rideId),
                adminRepositoryUpdateQuery.addRevenu(adminAmount)
            ]);
            const result = await rideRepositoryUpdateQuery.updatePaymentInfo(data, adminAmount, driverAmount)
            let scheduledRide
            if (!result) {
                scheduledRide = await scheduleRideUpdateQuery.updatePaymentInfo(data, adminAmount, driverAmount)
                if (!scheduledRide) {
                    return null
                }
            }

            const emailInfo = {
                to: user?.email,
                subject: "Payment Successful",
                message: "Your Payment has been successful"
            }

            const emailData = {
                userName: user?.name,
                pickUpLocation: result ? result.pickupLocation : scheduledRide?.pickupLocation,
                dropOffLocation: result ? result.dropoffLocation : scheduledRide?.dropoffLocation,
                driverName: driver?.name,
                vehicleType: driver?.vehicleDocuments.vehicleModel,
                vehicleNo: driver?.vehicleDocuments.registration.registrationId,
                amount: result ? result.price : scheduledRide?.price
            }
            const emalResult = await nodeMailer.sendRideConfirmEmail(emailInfo, emailData)
            console.log(emalResult)


        } catch (error) {
            handleError(error as Error)
        }
    },

    getUserRidesHistory: async (userId: string) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery.getRideWithUserId(userId),
                scheduleRideGetQuery.getScheduledRidesByUserId(userId)
            ])
            const favoriteQuickRides = quickRides.filter(ride => ride.favourite === true);
            const favoritescheduledRides = scheduledRides.filter(ride => ride.favourite === true);
            const favouriteRides = [...favoriteQuickRides, ...favoritescheduledRides]

            return { quickRides, scheduledRides, favouriteRides }
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
    },

    addFavouriteRide: async (rideId: string) => {
        try {
            const response = await rideRepositoryUpdateQuery.updateFavouriteRide(rideId)
            if (!response) {
                const scheduleRide = await scheduleRideUpdateQuery.updateFavouriteRide(rideId)
            }
            return true
        } catch (error) {
            handleError(error as Error)
        }
    },

    getRideInfoWithID: async (rideId: string) => {
        try {
            const response = await rideRepositoryGetQuery.findRideWithId(rideId)
            if (!response) {
                return await scheduleRideGetQuery.getScheduledRidesById(rideId)
            }
            return response
        } catch (error) {
            handleError(error as Error)
        }
    },


    submitReview: async (data: { rideId: string, review: string, rating: string }) => {
        try {
            const result = await rideRepositoryUpdateQuery.submitReview(data)
            if (!result) {
                await scheduleRideUpdateQuery.submitReview(data)
                return true
            }
            else {
                return true
            }
        } catch (error) {
            handleError(error as Error)
        }
    }
}


