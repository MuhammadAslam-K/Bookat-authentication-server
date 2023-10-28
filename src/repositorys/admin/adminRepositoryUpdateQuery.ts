import { ObjectId } from 'mongoose';
import UserSchema from '../../entites/userEntites';
import DriverSchema from '../../entites/driverEntites';
import AdminSchema from '../../entites/adminEntites';



export default {
    blockUser: async (userId: ObjectId) => {
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

    blockDriver: async (driverId: ObjectId) => {
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
    }
}