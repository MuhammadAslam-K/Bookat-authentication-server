import { Schema } from "mongoose";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys";

export interface driverInfo {
    aadharId: string,
    drivingLicenseId: string,
    address: string,
    aadharImageUrl: string,
    licenseImageUrl: string,
    driverImageUrl: string
}

export interface vehicleInfo {
    registrationId: string,
    rcImageUrl: string,
    vehicleModel: string,
    maxPersons: string,
    vehicleType: string,
    vehicleImageUrl1: string,
    vehicleImageUrl2: string
}


export default {

    saveDriverInfo: async (data: driverInfo, driverId: Schema.Types.ObjectId) => {
        try {
            const aadharidExists = await driverRepositoryGetQuerys.findDriverWithAadharId(data.aadharId)
            if (!aadharidExists) {
                const drivingLicenseIdExists = await driverRepositoryGetQuerys.findDriverWithDrivingLicenseId(data.drivingLicenseId)

                if (!drivingLicenseIdExists) {
                    return await driverRepositoryUpdateQuerys.updateDriverInfo(data, driverId);
                }
                else {
                    throw new Error("License Id already Exists please Re-check !!")
                }
            }
            else {
                throw new Error("Aadhar Id already Exists please Re-check !!")
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    saveVehicleInfo: async (data: vehicleInfo, driverId: Schema.Types.ObjectId) => {
        try {
            const rcExists = await driverRepositoryGetQuerys.findVehicleWithRcNo(data.registrationId)
            if (!rcExists) {
                return await driverRepositoryUpdateQuerys.updateVehicleInfo(data, driverId)

            }
            else {
                throw new Error("Registration No already Exists please Re-check !!")
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },


}

