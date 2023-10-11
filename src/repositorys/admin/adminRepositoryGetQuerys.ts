import { ObjectId } from "mongoose"
import AdminSchema from "../../entites/adminEntites"
import DriverSchema from "../../entites/driverEntites"
import UserSchema from "../../entites/userEntites"

export default {
    getAdminWithEmail: async (email: string) => {
        try {
            return await AdminSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getAllUsers: async () => {
        try {
            return await UserSchema.find()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getAllDriver: async () => {
        try {
            return await DriverSchema.find()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getSingleDriver: async (driverId: ObjectId) => {
        try {
            return await DriverSchema.findById(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}