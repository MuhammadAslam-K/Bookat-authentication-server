import { ObjectId } from "mongoose"
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"
import { handleError } from "../../errors/errorHandling"

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

