import { ObjectId } from "mongoose"
import ScheduleRideSchema from "../../entites/scheduledRideEntites"

export default {
    driverAcceptedRide: async (driverId: ObjectId, rideId: ObjectId) => {
        try {
            await ScheduleRideSchema.findByIdAndUpdate(
                rideId,
                {
                    driver_id: driverId,
                    driverAccepted: "Accepted"
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
    }
}