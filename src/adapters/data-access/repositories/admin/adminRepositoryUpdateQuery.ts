import { ObjectId } from "mongodb"
import UserSchema from '../../models/user-model';
import DriverSchema from '../../models/driver-model';
import AdminSchema from '../../models/admin-model';



export default {
    blockUser: async (userId: string) => {
        try {
            const user = await UserSchema.findById(userId)
            if (user) {
                user.block = !user.block
                return await user.save()
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    blockDriver: async (driverId: string) => {
        try {
            const driver = await DriverSchema.findById(driverId)
            if (driver) {
                driver.block = !driver.block
                return await driver.save()
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    approveDriverInfo: async (driverId: ObjectId) => {
        try {
            await DriverSchema.findByIdAndUpdate(
                driverId,
                { 'driver.driverVerified': true },
                { new: true }
            )
            return true
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    approveVehicleInfo: async (driverId: ObjectId) => {
        try {
            await DriverSchema.findByIdAndUpdate(
                driverId,
                { 'vehicle.vehicleVerified': true },
                { new: true }
            )
            return true
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    addRevenu: async (amount: number) => {
        try {
            const admin = await AdminSchema.findOne()
            if (admin) {
                const addRevenu = admin.revenue
                admin.revenue = addRevenu + amount
                return await admin.save()
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    rejectPersonalInfo: async (id: ObjectId) => {
        try {
            await DriverSchema.findByIdAndUpdate(
                id,
                { 'driver.driverVerified': false },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },

    rejectVehicleInfo: async (id: ObjectId) => {
        try {
            await DriverSchema.findByIdAndUpdate(
                id,
                { 'vehicle.vehicleVerified': false },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}