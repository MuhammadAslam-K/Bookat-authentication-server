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
                        'vehicleDocuments.registration.registrationId': data.registrationNo,
                        'vehicleDocuments.registration.registrationImage': data.rcImageUrl,
                        'vehicleDocuments.vehicleModel': data.vehicleModel,
                        'vehicleDocuments.maxPersons': data.maxPersons,
                        'vehicleDocuments.vehicleType': data.vehicleType,
                        'vehicleDocuments.vehicleImage1': data.vehicleImageUrl1,
                        'vehicleDocuments.vehicleImage2': data.vehicleImageUrl2,
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
    },

    changeDriverAvailablety: async (driverId: ObjectId) => {
        try {
            const driver = await DriverSchema.findById(driverId);
            if (driver) {
                driver.isAvailable = !driver.isAvailable
                const result = await driver.save()
                return result.isAvailable
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}