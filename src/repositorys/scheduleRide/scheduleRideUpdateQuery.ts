import { ObjectId } from "mongoose"
import ScheduleRideSchema from "../../entites/scheduledRideEntites"

export default {
    driverAcceptedRide: async (driverId: ObjectId, rideId: ObjectId, latitude: string, longitude: string) => {
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

    startRide: async (rideId: ObjectId) => {
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

    updatePaymentInfo: async (data: { driverId: ObjectId, rideId: ObjectId, rating: string, review: string }) => {
        try {
            return await ScheduleRideSchema.findByIdAndUpdate(
                data.rideId,
                {
                    status: "Completed",
                    feedback: data.review,
                    rating: data.rating,
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}