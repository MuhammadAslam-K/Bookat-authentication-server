import { handleError } from "../../errors/errorHandling";
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys";
import rideRepositoryGetQuery from "../../../adapters/data-access/repositories/rideRepository/rideRepositoryGetQuery";
import scheduleRideGetQuery from "../../../adapters/data-access/repositories/scheduleRide/scheduleRideGetQuery";
import userRepositoryGetQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery";



export default {
    dashboardData: async () => {
        try {
            const [totalUsers, totalDrivers, totalQuickRides, totalScheduledRides] = await Promise.all([
                userRepositoryGetQuery.getAllUsers(),
                driverRepositoryGetQuerys.getAllDrivers(),
                rideRepositoryGetQuery.getAllQuickRides(),
                scheduleRideGetQuery.getAllScheduledRides(),
            ])
            const totalUsersCount = totalUsers.length
            const totalDriversCount = totalDrivers.length
            const totalQuickRidesCount = totalQuickRides.length
            const totalScheduledRidesCount = totalScheduledRides.length
            const totalRidesCount = totalQuickRidesCount + totalScheduledRidesCount

            return {
                totalUsersCount,
                totalDriversCount,
                totalQuickRidesCount,
                totalScheduledRidesCount,
                totalRidesCount,

                totalUsers,
                totalDrivers,
                totalQuickRides,
                totalScheduledRides
            }

        } catch (error) {
            handleError(error as Error)

        }
    }
}