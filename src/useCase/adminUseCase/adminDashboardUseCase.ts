import { handleError } from "../../infrastructure/common/errorHandling";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys";
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery";
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery";
import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery";



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
            // const totalRides = totalQuickRides.concat(totalScheduledRides)

            return {
                totalUsersCount,
                totalDriversCount,
                totalQuickRidesCount,
                totalScheduledRidesCount,
                totalRidesCount,
            }

        } catch (error) {
            handleError(error as Error)

        }
    }
}