import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import rideRepositoryUpdateQuery from "../../repositorys/rideRepository/rideRepositoryUpdateQuery"

export default {
    getDriverById: async (driverId: ObjectId) => {
        try {
            return await driverRepositoryGetQuerys.findDriverWithId(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getRideDetails: async (rideId: ObjectId) => {
        try {
            return await rideRepositoryGetQuery.findRideWithId(rideId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    payment: async (data: { driverId: ObjectId, rideId: ObjectId, rating: string, review: string }, userId: ObjectId) => {
        try {
            const [updatedUser, updatedDriver, updatedRide] = await Promise.all([
                userRepositoryUpdateQuery.updateTotalRide(userId),
                driverRepositoryUpdateQuerys.updateTotalRide(data.driverId),
                rideRepositoryUpdateQuery.updatePaymentInfo(data)
            ]);

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    rides: async (userId: ObjectId) => {
        try {
            return await rideRepositoryGetQuery.getRides(userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

}




// [1] data {
// [1]   vehicle: 'Prime',
// [1]   amount: '',
// [1]   fromLocation: 'Anekal, Karnataka, India',
// [1]   toLocation: 'Chennai, Tamil Nadu, India',
// [1]   distance: '282',
// [1]   duration: 7.043752888807411,
// [1]   fromLocationLat: 12.708637,
// [1]   fromLocationLong: 77.699397,
// [1]   toLocationLat: 13.083694,
// [1]   toLocationLong: 80.270186,
// [1]   selectedDateTime: null
// [1] }