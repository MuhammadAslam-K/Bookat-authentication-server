import { ObjectId } from "mongoose"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import scheduleRideUpdateQuery from "../../repositorys/scheduleRide/scheduleRideUpdateQuery"

export default {

    getScheduledRideHistoryByDriverId: async (driverId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.getScheduledRidesByDriverId(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getNotApprovedScheduleRides: async () => {
        try {
            return await scheduleRideGetQuery.getNotApprovedScheduleRides()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    driverAcceptScheduledRide: async (rideId: ObjectId, driverId: ObjectId) => {
        try {
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery.getScheduledRidesById(rideId),
                driverRepositoryGetQuerys.findDriverWithId(driverId)
            ]);

            if (rideInfo && driverInfo) {
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

                console.log("No conflicts detected. Driver can accept the ride.");
                await driverRepositoryUpdateQuerys.addScheduledRide(rideId, newRidePickupDate, rideInfo.duration, driverId);
                await scheduleRideUpdateQuery.driverAcceptedRide(driverId, rideId);
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}