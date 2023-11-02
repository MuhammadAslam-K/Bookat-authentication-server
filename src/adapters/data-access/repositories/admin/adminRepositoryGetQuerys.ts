import AdminSchema from "../../models/admin-model.js"
import DriverSchema from "../../models/driver-model.js"
import UserSchema from "../../models/user-model.js"

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
}