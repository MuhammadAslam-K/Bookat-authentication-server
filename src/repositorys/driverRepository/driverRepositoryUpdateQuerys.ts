import { ObjectId } from "mongoose"
import DriverSchema from "../../entites/driverEntites"
import { walletDetails } from "../../useCase/userUseCase/userRegistrationUseCase"
import { driverInfo, vehicleInfo } from "../../useCase/driverUseCase/driverRegistrationUsecase"

export default {
    addAmountInWallet: async (details: walletDetails, driverId: ObjectId) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $push: {
                        'wallet.transactions': details
                    },
                    $inc: {
                        'wallet.balance': details.amount
                    },
                },
                { new: true },

            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateDriverInfo: async (data: driverInfo, driverId: ObjectId) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $set: {
                        'license.licenseId': data.drivingLicenseId,
                        'license.licenseImage': data.licenseImageUrl,
                        'driverImageUrl': data.driverImageUrl,
                        'aadhar.aadharId': data.aadharId,
                        'aadhar.aadharImage': data.aadharImageUrl,
                        'driver.driverDocuments': true
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateVehicleInfo: async (data: vehicleInfo, driverId: ObjectId) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $set: {
                        'vehicle.registration.registrationId': data.registrationNo,
                        'vehicle.registration.registrationImage': data.rcImageUrl,
                        'vehicle.vehicleModel': data.vehicleModel,
                        'vehicle.maxPersons': data.maxPersons,
                        'vehicle.vehicleType': data.vehicleType,
                        'vehicle.vehicleImage1': data.vehicleImageUrl1,
                        'vehicle.vehicleImage2': data.vehicleImageUrl2,
                        'vehicle.vehicleDocuments': true
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updatePassword: async (email: string, password: string) => {
        try {
            await DriverSchema.findOneAndUpdate(
                { email },
                { password },
                { new: true }
            )
            return true
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}