import { ObjectId } from "mongoose"
import DriverSchema from "../../models/driver-model"


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

    findDriverWithId: async (driverId: ObjectId | string) => {
        try {
            return await DriverSchema.findById(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getVehicleInfoWithDriverId: async (driverId: ObjectId) => {
        try {
            return await DriverSchema.findById(driverId, 'vehicleDocuments')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getAllDrivers: async () => {
        try {
            return await DriverSchema.find()
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}