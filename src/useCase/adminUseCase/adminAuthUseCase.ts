import { ObjectId } from "mongoose"
import encryptionDecryption from "../../services/encryptionDecryption"
import adminRepositoryGetQuerys from "../../repositorys/admin/adminRepositoryGetQuerys"

export default {
    signIn: async (data: { email: string, password: string }) => {
        try {
            const admnExists = await adminRepositoryGetQuerys.getAdminWithEmail(data.email)

            if (admnExists.length != 0 && admnExists[0].password == data.password) {
                return encryptionDecryption.createToken(admnExists[0]._id as ObjectId, "admin", "1h")
            } else {
                throw new Error("Unautherised access")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}