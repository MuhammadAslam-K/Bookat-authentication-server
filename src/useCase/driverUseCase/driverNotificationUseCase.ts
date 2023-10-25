import twilio from "../../services/twilio";
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery";
import rideRepositoryUpdateQuery from "../../repositorys/rideRepository/rideRepositoryUpdateQuery";
import { ObjectId } from "mongoose";

export default {
    verifyotp: async (data: { otp: string, mobile: string, rideId: ObjectId }) => {
        try {
            const response = await twilio.verifySMS(data.mobile, data.otp)
            if (response) {
                console.log("resonse", response)
                const scheduleRideResponse = await scheduleRideUpdateQuery.updateOtp(data.rideId)
                console.log("scheduleRideResponse", scheduleRideResponse)
                if (!scheduleRideResponse) {
                    const ride = await rideRepositoryUpdateQuery.updateOtp(data.rideId)
                    console.log("ride in", ride)
                }
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}