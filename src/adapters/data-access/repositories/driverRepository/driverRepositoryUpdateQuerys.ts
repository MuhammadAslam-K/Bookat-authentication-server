import { ObjectId } from "mongoose"
import DriverSchema from "../../models/driver-model"
import { walletDetails } from "../../../../business/useCase/userUseCase/userRegistrationUseCase"
import { driverInfo, vehicleInfo } from "../../../../business/useCase/driverUseCase/driverRegistrationUsecase"
import { profileUpdate } from "../../../../business/useCase/driverUseCase/driverProfileUseCase"

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
                        'driver.driverDocuments': true,
                        'driver.driverVerified': false,
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateVehicleInfo: async (data: vehicleInfo, driverId: ObjectId | string) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $set: {
                        'vehicleDocuments.registration.registrationId': data.registrationId,
                        'vehicleDocuments.registration.registrationImage': data.rcImageUrl,
                        'vehicleDocuments.vehicleModel': data.vehicleModel,
                        'vehicleDocuments.maxPersons': data.maxPersons,
                        'vehicleDocuments.vehicleType': data.vehicleType,
                        'vehicleDocuments.vehicleImage1': data.vehicleImageUrl1,
                        'vehicleDocuments.vehicleImage2': data.vehicleImageUrl2,
                        'vehicle.vehicleDocuments': true,
                        'vehicle.vehicleVerified': false,
                    }
                },
                { new: true }
            )
        } catch (error) {
            console.log(error)
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
    },

    updateDriverProfile: async (data: profileUpdate, driverId: ObjectId) => {
        try {
            console.log(data)
            await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $set: {
                        name: data.name,
                        email: data.email,
                        mobile: data.mobile,
                        driverImageUrl: data.driverImageUrl,
                        'aadhar.aadharId': data.aadharId,
                        'aadhar.aadharImage': data.aadharImageUrl,
                        'license.licenseId': data.licenseId,
                        'license.licenseImage': data.licenseImageUrl,
                        'driver.driverDocuments': false,
                        'driver.driverVerified': false,
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateTotalRideAndRevenu: async (driverId: ObjectId, driverAmount: number, rideId: ObjectId) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $inc: {
                        'RideDetails.completedRides': 1,
                        'revenue': driverAmount,
                    },
                    $pull: {
                        scheduledRides: {
                            rideId: rideId,
                        },
                    },
                    isRiding: false,
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    changeTheRideStatus: async (driverId: ObjectId) => {
        try {
            const driver = await DriverSchema.findById(driverId)
            if (driver) {
                const status = driver.isRiding
                driver.isRiding = !status
                await driver.save()
            }
            return driver
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    addScheduledRide: async (rideId: string, newRidePickupDate: Date, duration: string, driverId: ObjectId) => {
        try {
            const newScheduledRide = {
                rideId: rideId,
                startingTime: newRidePickupDate,
                duration: duration,
            };
            await DriverSchema.findByIdAndUpdate(
                driverId,
                {
                    $push: { scheduledRides: newScheduledRide },
                },
                { new: true }
            );
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    popUpTheScheduledRide: async (driverId: ObjectId, rideId: ObjectId) => {
        try {
            const filter = { _id: driverId };
            const update = {
                $pull: {
                    scheduledRides: {
                        rideId: rideId
                    }
                }
            };
            await DriverSchema.updateOne(filter, update);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
}