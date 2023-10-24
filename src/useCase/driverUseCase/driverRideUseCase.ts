import { ObjectId } from 'mongoose';
import userRepositoryGetQuery from '../../repositorys/userRepository/userRepositoryGetQuery';
import rideRepositorySaveQuery from '../../repositorys/rideRepository/rideRepositorySaveQuery';
import rideRepositoryGetQuery from '../../repositorys/rideRepository/rideRepositoryGetQuery';
import driverRepositoryGetQuerys from '../../repositorys/driverRepository/driverRepositoryGetQuerys';
import driverRepositoryUpdateQuerys from '../../repositorys/driverRepository/driverRepositoryUpdateQuerys';

export default {
    getUser: async (userId: ObjectId) => {
        try {
            return (await userRepositoryGetQuery.getUserWithId(userId))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    saveNewRide: async (data: any) => {
        try {
            const response = await rideRepositorySaveQuery.saveRideInfo(data)
            const driver = await driverRepositoryUpdateQuerys.changeTheRideStatus(response.driver_id)
            return response._id
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideWithDriverId: async (driverId: ObjectId) => {
        try {
            return await rideRepositoryGetQuery.getRideDetailsByDriverId(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    checkAvailableDrivers: async (driverId: ObjectId, durationInMinutes: number) => {
        try {
            const driver = await driverRepositoryGetQuerys.findDriverWithId(driverId);
            const currentDateTime = new Date();
            const scheduledRides = driver?.scheduledRides;
            console.log("driver data", driver)

            if (driver) {
                // if (driver.isRiding) {
                //     return false
                // }
                if (!driver.isAvailable) {
                    return false;
                }

                for (const ride of scheduledRides) {
                    const startingTime = new Date(ride.startingTime);
                    const endingTime = new Date(ride.endingTime);

                    // Calculate the requested end time based on the current time and duration
                    const requestedEndTime = new Date(currentDateTime.getTime() + durationInMinutes * 60000);

                    // Check if the requested ride overlaps with the scheduled ride
                    if (
                        (currentDateTime >= startingTime && currentDateTime <= endingTime) ||
                        (currentDateTime <= startingTime && requestedEndTime >= startingTime)
                    ) {
                        return false; // Overlapping rides
                    }
                }

                return true; // No overlapping rides, driver is available
            }

            return false; // Driver not found



        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
