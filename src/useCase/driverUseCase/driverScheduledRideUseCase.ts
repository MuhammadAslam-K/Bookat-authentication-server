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


    //     [1] data {
    // [1]   rideId: '653b799431b780c6d72414fc',
    // [1]   latitude: 13.0826802,
    // [1]   longitude: 80.2707184
    // [1] }
    driverAcceptScheduledRide: async (data: { rideId: ObjectId, latitude: string, longitude: string }, driverId: ObjectId) => {
        try {
            const [rideInfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery.getScheduledRidesById(data.rideId),
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
                await driverRepositoryUpdateQuerys.addScheduledRide(data.rideId, newRidePickupDate, rideInfo.duration, driverId);
                // const latNum = parseInt(data.latitude)
                // const longNum = parseInt(data.longitude)
                await scheduleRideUpdateQuery.driverAcceptedRide(driverId, data.rideId, data.latitude, data.longitude);
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getPendingScheduledRides: async (driverId: ObjectId) => {
        try {
            return await scheduleRideGetQuery.findPendingScheduledRidesWithDriverId(driverId)
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    startScheduledRide: async (rideId: ObjectId, driverId: ObjectId) => {
        try {
            return await Promise.all([
                scheduleRideUpdateQuery.startRide(rideId),
                driverRepositoryUpdateQuerys.changeTheRideStatus(driverId)
            ]);
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }

}