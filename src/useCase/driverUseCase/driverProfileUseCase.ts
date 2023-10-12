import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"

export interface profileUpdate {
    name: string,
    email: string,
    mobile: string,
    aadharId: string,
    licenseId: string,
    aadharImageUrl: string,
    licenseImageUrl: string,
    driverImageUrl: string,
    // vehicleVerified: string,
    // driverVerified: string,
}

export default {
    getDriverProfile: async (driverId: ObjectId) => {
        try {
            return (await driverRepositoryGetQuerys.findDriverWithId(driverId))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateProfile: async (data: profileUpdate, driverId: ObjectId) => {
        try {
            return (await driverRepositoryUpdateQuerys.updateDriverProfile(data, driverId))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

