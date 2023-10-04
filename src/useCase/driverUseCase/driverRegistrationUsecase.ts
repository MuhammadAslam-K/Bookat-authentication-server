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
    registrationNo: string,
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
            const rcExists = await driverRepositoryGetQuerys.findVehicleWithRcNo(data.registrationNo)
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

// {
//     [1]   registrationNo: 'NY 45 C 1234',
//     [1]   vehicleModel: 'innova',
//     [1]   maxPersons: '7',
//     [1]   vehicleType: '',
//     [1]   rcImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2Frc%2Fimage-170-1024x683.png?alt=media&token=d8f5ac0b-4419-4a1f-b963-bf37d642b90b',
//     [1]   vehicle1ImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2FvehicleImage1%2Fwork-1.png?alt=media&token=94fc878b-ce37-4938-b9da-d5d416e76476',
//     [1]   vehicle2ImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2FvehicleImage2%2Fimage-170-1024x683.png?alt=media&token=e4f57f5a-2798-4b60-a60b-954624b1cf09'
//     [1] }