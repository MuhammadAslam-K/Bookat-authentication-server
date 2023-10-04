import AdminSchema from "../entites/adminEntites"

export default {
    getAdminWithEmail: async (email: string) => {
        try {
            return await AdminSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}