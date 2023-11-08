import { ObjectId } from "mongoose"
import ScheduleRideSchema from "../../models/scheduledRide-model"

export default {
    driverAcceptedRide: async (driverId: ObjectId, rideId: string, latitude: string, longitude: string) => {
        try {
            await ScheduleRideSchema.findByIdAndUpdate(
                rideId,
                {
                    driver_id: driverId,
                    driverAccepted: "Accepted",
                    'driverCoordinates.latitude': latitude,
                    'driverCoordinates.longitude': longitude
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateOtp: async (rideId: ObjectId) => {
        try {
            const response = await ScheduleRideSchema.findByIdAndUpdate(
                rideId,
                { otpVerifyed: true },
                { new: true },
            )
            return response ? true : false

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    startRide: async (rideId: string) => {
        try {
            return await ScheduleRideSchema.findByIdAndUpdate(
                rideId,
                { status: "Started" },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    updatePaymentInfo: async (data: { driverId: ObjectId, rideId: ObjectId }, adminAmount: number, driverAmount: number) => {
        try {
            return await ScheduleRideSchema.findByIdAndUpdate(
                data.rideId,
                {
                    status: "Completed",
                    adminRevenu: adminAmount,
                    driverRevenu: driverAmount,
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    cancelTheBookedRide: async (rideId: ObjectId) => {
        try {
            return await ScheduleRideSchema.findByIdAndUpdate(
                rideId,
                { status: "Cancelled" },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    updateFavouriteRide: async (rideId: string) => {
        try {
            const ride = await ScheduleRideSchema.findById(rideId)
            if (ride) {
                ride.favourite = !ride.favourite
                await ride.save()
                return true
            }
            return false
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    submitReview: async (data: { rideId: string, review: string, rating: string }) => {
        try {
            return await ScheduleRideSchema.findByIdAndUpdate(
                data.rideId,
                {
                    feedback: data.review,
                    rating: data.rating
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}