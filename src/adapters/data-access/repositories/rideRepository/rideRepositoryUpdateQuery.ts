import { ObjectId } from "mongoose"
import RideSchema from "../../models/quickRide-model";
import { handleError } from "../../../../business/errors/errorHandling";

export default {
    updatePaymentInfo: async (data: { driverId: ObjectId, rideId: ObjectId }, adminAmount: number, driverAmount: number) => {
        try {
            return await RideSchema.findByIdAndUpdate(
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

    updateOtp: async (rideId: ObjectId) => {
        try {
            return await RideSchema.findByIdAndUpdate(
                rideId,
                { otpVerifyed: true },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateFavouriteRide: async (rideId: string) => {
        try {
            const ride = await RideSchema.findById(rideId)
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
            return await RideSchema.findByIdAndUpdate(
                data.rideId,
                {
                    feedback: data.review,
                    rating: data.rating
                },
                { new: true }
            )
        } catch (error) {
            handleError(error as Error)
        }
    }
}