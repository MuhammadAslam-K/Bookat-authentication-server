import { ObjectId } from "mongoose"
import adminRepositoryGetQuerys from "../../repositorys/admin/adminRepositoryGetQuerys"
import adminRepositoryUpdateQuery from "../../repositorys/admin/adminRepositoryUpdateQuery"

export default {
    getUsers: async () => {
        try {
            return await adminRepositoryGetQuerys.getAllUsers()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    blockUser: async (userId: ObjectId) => {
        try {
            return await adminRepositoryUpdateQuery.blockUser(userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}