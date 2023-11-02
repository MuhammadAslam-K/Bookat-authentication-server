import { ObjectId } from "mongoose"
import encryptionDecryption from "../../shared/utilities/encryptionDecryption"
import adminRepositoryGetQuerys from "../../../adapters/data-access/repositories/admin/adminRepositoryGetQuerys"
import { handleError } from "../../errors/errorHandling"

export default {
    signIn: async (data: { email: string, password: string }) => {
        try {
            const admnExists = await adminRepositoryGetQuerys.getAdminWithEmail(data.email)

            if (admnExists.length != 0 && admnExists[0].password == data.password) {
                return encryptionDecryption.createToken(admnExists[0]._id as ObjectId, "admin", "5h")
            } else {
                throw new Error("Unautherised access")
            }
        } catch (error) {
            handleError(error as Error)
        }
    }
}