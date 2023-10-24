import { ObjectId } from "mongoose"
import RideSchema from "../../entites/rideEntites";

export default {
    updatePaymentInfo: async (data: { driverId: ObjectId, rideId: ObjectId, rating: string, review: string }) => {
        try {
            await RideSchema.findByIdAndUpdate(
                data.rideId,
                {
                    status: "Completed",
                    paymentMode: "Cash",
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