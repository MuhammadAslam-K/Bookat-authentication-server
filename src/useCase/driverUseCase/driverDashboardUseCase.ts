import { ObjectId } from "mongodb";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys";
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery";
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery";



export default {
    dashboardInfo: async (driverId: string) => {
        try {
            const [driverData, quickRides, scheduledRides] = await Promise.all([
                driverRepositoryGetQuerys.findDriverWithId(driverId),
                rideRepositoryGetQuery.getRidesWithDriverId(driverId),
                scheduleRideGetQuery.getScheduledRidesWithDriverId(driverId)
            ])
            const quickRidesCount = quickRides.length
            const scheduledRidesCount = scheduledRides.length
            return { driverData, quickRides, scheduledRides, quickRidesCount, scheduledRidesCount }
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}
