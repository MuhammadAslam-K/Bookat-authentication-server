import { ObjectId } from "mongoose"
import auth from "../../middlewares/jwtTokenAuth"
import adminRepository from "../../repositorys/adminRepository"

export default {
    signIn: async (data: { email: string, password: string }) => {
        try {
            const admnExists = await adminRepository.getAdminWithEmail(data.email)

            if (admnExists.length != 0 && admnExists[0].password == data.password) {
                return auth.createToken(admnExists[0]._id as ObjectId)
            } else {
                throw new Error("Unautherised access")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}