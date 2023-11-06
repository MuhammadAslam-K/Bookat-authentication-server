import { rideConfirmEmailData } from '../../interfaces/email';
import { ObjectId } from "mongoose"
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery"
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"
import scheduleRideUpdateQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideUpdateQuery"
import { error } from "console"
import { handleError } from "../../errors/errorHandling"
import { emailInfo } from "../../interfaces/email"
import nodeMailer from '../../../adapters/external-services/email/nodeMailer';

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

                await Promise.all([
                    driverRepositoryUpdateQuerys.addScheduledRide(data.rideId, newRidePickupDate, rideInfo.duration, driverId),
                    scheduleRideUpdateQuery.driverAcceptedRide(driverId, data.rideId, data.latitude, data.longitude),
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