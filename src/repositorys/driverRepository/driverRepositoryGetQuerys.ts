import { ObjectId } from "mongoose"
import DriverSchema from "../../entites/driverEntites"
import { signupData, walletDetails } from "../../useCase/userUseCase/userRegistrationUseCase"

export default {
    findDriverWithEmail: async (email: string) => {
        try {
            return await DriverSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findDriverWithMobile: async (mobile: string) => {
        try {
            return await DriverSchema.find({ mobile: mobile })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getDriverWithRefrelCode: async (refrelCode: string) => {
        try {
            return await DriverSchema.find({ refrel: refrelCode })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findDriverWithAadharId: async (aadharId: string) => {
        try {
            return await DriverSchema.findOne({ 'aadhar.aadharId': aadharId });
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findDriverWithDrivingLicenseId: async (drivingLicenseId: string) => {
        try {
            return await DriverSchema.findOne({ 'license.licenseId': drivingLicenseId });
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findVehicleWithRcNo: async (rcNo: string) => {
        try {
            return await DriverSchema.findOne({ 'registration.registrationId': rcNo });
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },



}