import { ObjectId } from "mongoose"
import userRepository from "../../repositorys/userRepository/userRepositoryGetQuery"
import bcryptPassword from "../../services/encryptionDecryption"
import encryptionDecryption from "../../services/encryptionDecryption"

export default {
    validateUser: async (data: { email: string, password: string }) => {
        try {
            const response = await userRepository.getUser("email", data.email)
            if (response.length != 0) {
                if (!response[0].password) {
                    throw new Error("Oops! It seems you signed up with Google")
                }
                else {
                    const comparePassword = await bcryptPassword.comparePassword(data.password, response[0].password)
                    if (!comparePassword) {
                        throw new Error("Invalid email or password")
                    }
                    else {
                        return encryptionDecryption.createToken(response[0]._id as ObjectId, "user", "1h")
                    }
                }
            }
            else {
                throw new Error("user doesn't exists please signUp")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    checkuserExists: async (email: string) => {
        try {
            const response = await userRepository.getUser("email", email)
            if (response.length != 0) {
                return encryptionDecryption.createToken(response[0]._id as ObjectId, "user", "1h")
            }
            else {
                throw new Error("user doesn't exists please signUp")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}