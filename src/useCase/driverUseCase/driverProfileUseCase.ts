import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import { handleError } from "../../infrastructure/common/errorHandling"

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
            handleError(error as Error)
        }
    },

    updateProfile: async (data: profileUpdate, driverId: ObjectId) => {
        try {
            return (await driverRepositoryUpdateQuerys.updateDriverProfile(data, driverId))
        } catch (error) {
            handleError(error as Error)
        }
    }
}

