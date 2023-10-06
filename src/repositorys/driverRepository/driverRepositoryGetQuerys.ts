import { ObjectId } from "mongoose"
import DriverSchema from "../../entites/driverEntites"
import { signupData, walletDetails } from "../../useCase/userUseCase/userRegistrationUseCase"

export default {
    getDriver: async (field: string, data: string) => {
        try {
            const query: { [key: string]: string } = {};
            query[field] = data;
            return await DriverSchema.find(query);
        } catch (error) {
            throw new Error((error as Error).message);
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