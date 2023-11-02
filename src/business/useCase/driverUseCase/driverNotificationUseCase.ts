import twilio from "../../../adapters/external-services/sms/twilio";
import scheduleRideUpdateQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery";
import rideRepositoryUpdateQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryUpdateQuery";
import { ObjectId } from "mongoose";
import { handleError } from "../../errors/errorHandling";

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
            handleError(error as Error)
        }
    }
}