import { rideConfirmEmailData } from './../../types/email';
import { ObjectId } from "mongoose"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery"
import { error } from "console"
import { handleError } from "../../infrastructure/common/errorHandling"
import { emailInfo } from "../../types/email"
import nodeMailer from '../../infrastructure/email/nodeMailer';

export default {

    getNotApprovedScheduleRides: async () => {
        try {
            return await scheduleRideGetQuery.getNotApprovedScheduleRides()
        } catch (error) {
            handleError(error as Error)
        }
    },


    driverAcceptScheduledRide: async (data: { rideId: string, latitude: string, longitude: string }, driverId: ObjectId) => {
        try {
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery.getScheduledRideWithIdAndUserData(data.rideId),
                driverRepositoryGetQuerys.findDriverWithId(driverId)
            ]);


            if (rideInfo && driverInfo) {

                if (!driverInfo.vehicle.vehicleVerified && !driverInfo.driver.driverVerified) {
                    throw new Error("Your details are not still verified by the Admin")
                }

                const newRidePickupDate = new Date(rideInfo.pickUpDate);
                const newRideDuration = parseFloat(rideInfo.duration);
                const newRideEndingTime = new Date(newRidePickupDate.getTime() + (newRideDuration * 60 * 1000));

                for (const scheduledRide of driverInfo.scheduledRides) {
                    const scheduledRideStartingTime = new Date(scheduledRide.startingTime);
                    const scheduledRideDuration = parseFloat(scheduledRide.duration);
                    const scheduledRideEndingTime = new Date(scheduledRideStartingTime.getTime() + (scheduledRideDuration * 60 * 1000));

                    if (
                        (newRidePickupDate >= scheduledRideStartingTime && newRidePickupDate <= scheduledRideEndingTime) ||
                        (newRideEndingTime >= scheduledRideStartingTime && newRideEndingTime <= scheduledRideEndingTime)
                    ) {
                        throw new Error("You already have a ride at that period.");
                    }
                }

                for (const scheduledRide of driverInfo.scheduledRides) {
                    const scheduledRideStartingTime = new Date(scheduledRide.startingTime);
                    const scheduledRideDuration = parseFloat(scheduledRide.duration);
                    const scheduledRideEndingTime = new Date(scheduledRideStartingTime.getTime() + (scheduledRideDuration * 60 * 1000));

                    if (
                        (newRideEndingTime >= scheduledRideStartingTime && newRideEndingTime <= scheduledRideEndingTime)
                    ) {
                        throw new Error("You already have a ride that conflicts in duration.");
                    }
                }
                const pickupTimeWithoutTimeZone = rideInfo.pickUpDate.toString().replace(/\sGMT\+\d{4}/, '');
                const emailInfo: emailInfo = {
                    to: rideInfo.user_id.email,
                    subject: "Ride Confirmed",
                    message: "Your Ride has been confirmed by the driver"
                }
                const emailData: rideConfirmEmailData = {
                    userName: rideInfo.user_id.name,
                    pickUpLocation: rideInfo.pickupLocation,
                    pickUpTime: pickupTimeWithoutTimeZone,
                    dropOffLocation: rideInfo.dropoffLocation,
                    driverName: driverInfo.name,
                    vehicleType: driverInfo.vehicleDocuments.vehicleModel,
                    vehicleNo: driverInfo.vehicleDocuments.registration.registrationId,
                    amount: rideInfo.price
                }

                await Promise.all([
                    driverRepositoryUpdateQuerys.addScheduledRide(data.rideId, newRidePickupDate, rideInfo.duration, driverId),
                    scheduleRideUpdateQuery.driverAcceptedRide(driverId, data.rideId, data.latitude, data.longitude),
                    nodeMailer.sendRideConfirmEmail(emailInfo, emailData)
                ])
            }
        } catch (error) {
            handleError(error as Error);
        }
    },

    getPendingScheduledRides: async (driverId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.findPendingScheduledRidesWithDriverId(driverId)
        } catch (error) {
            handleError(error as Error);
        }
    },

    startScheduledRide: async (rideId: string, driverId: ObjectId) => {
        try {
            return await Promise.all([
                scheduleRideUpdateQuery.startRide(rideId),
                driverRepositoryUpdateQuerys.changeTheRideStatus(driverId)
            ]);
        } catch (error) {
            handleError(error as Error);
        }
    }

}