import { ObjectId } from 'mongoose';
import userRepositoryGetQuery from '../../repositorys/userRepository/userRepositoryGetQuery';
import rideRepositorySaveQuery from '../../repositorys/rideRepository/rideRepositorySaveQuery';
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
            return response._id
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
