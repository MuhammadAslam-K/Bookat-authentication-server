import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"

export default {
    getDriverProfile: async (driverId: ObjectId) => {
        try {
            return (await driverRepositoryGetQuerys.findDriverWithId(driverId))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}