import { ObjectId } from "mongoose"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"

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
            const [rideinfo, driverInfo] = await Promise.all([
                scheduleRideGetQuery.getScheduledRidesById(rideId),
                driverRepositoryGetQuerys.findDriverWithId(driverId)
            ]);

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}