import { ObjectId } from 'mongoose';
import userRepositoryGetQuery from '../../repositorys/userRepository/userRepositoryGetQuery';
import rideRepositorySaveQuery, { rideData } from '../../repositorys/rideRepository/rideRepositorySaveQuery';
import rideRepositoryGetQuery from '../../repositorys/rideRepository/rideRepositoryGetQuery';
import driverRepositoryGetQuerys from '../../repositorys/driverRepository/driverRepositoryGetQuerys';
import driverRepositoryUpdateQuerys from '../../repositorys/driverRepository/driverRepositoryUpdateQuerys';
import scheduleRideGetQuery from '../../repositorys/scheduleRide/scheduleRideGetQuery';

export default {
    getUser: async (userId: ObjectId) => {
        try {
            return (await userRepositoryGetQuery.getUserWithId(userId))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    saveNewRide: async (data: rideData) => {
        try {
            const result = await driverRepositoryGetQuerys.findDriverWithId(data.driverId)
            if (!result?.driver.driverVerified && !result?.vehicle.vehicleVerified) {
                throw new Error("Driver is not verified")
            }
            const response = await rideRepositorySaveQuery.saveRideInfo(data)
            const driver = await driverRepositoryUpdateQuerys.changeTheRideStatus(response.driver_id)
            return response._id
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getDriverRideHistory: async (driverId: string) => {
        try {
            const [quickRides, scheduledRides] = await Promise.all([
                rideRepositoryGetQuery.getRideDetailsByDriverId(driverId),
                scheduleRideGetQuery.getScheduledRidesWithDriverId(driverId)
            ])
            return { quickRides, scheduledRides }
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
                if (driver.isRiding) {
                    return false
                }
                if (!driver.isAvailable) {
                    return false;
                }

                for (const ride of scheduledRides) {
                    const startingTime = new Date(ride.startingTime);
                    const endingTime = new Date(ride.endingTime);

                    const requestedEndTime = new Date(currentDateTime.getTime() + durationInMinutes * 60000);

                    if (
                        (currentDateTime >= startingTime && currentDateTime <= endingTime) ||
                        (currentDateTime <= startingTime && requestedEndTime >= startingTime)
                    ) {
                        return false;
                    }
                }

                return true;
            }

            return false;

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getCurrentRide: async (driverId: ObjectId) => {
        try {
            const response = await rideRepositoryGetQuery.getCurrentRideForDriver(driverId)
            if (response.length == 0) {
                const scheduleRide = await scheduleRideGetQuery.getCurrentScheduledRideForDriver(driverId)
                if (scheduleRide.length == 0) {
                    return null
                } else {
                    return scheduleRide
                }
            } else {
                return response
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
