import { ObjectId } from "mongodb";
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys";
import rideRepositoryGetQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery";
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery";
import { handleError } from "../../errors/errorHandling";
import cabrepositoryGetQuery from "../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery";



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
            return {
                driverData,
                quickRides,
                scheduledRides,
                quickRidesCount,
                scheduledRidesCount
            }
        } catch (error) {
            handleError(error as Error)
        }
    },

    listAllCabs: async () => {
        try {
            return await cabrepositoryGetQuery.getAllTheCabs()
        } catch (error) {
            handleError(error as Error)
        }
    }
}

