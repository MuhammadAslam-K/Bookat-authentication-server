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
                else if (response[0].block) {
                    throw new Error("Oops! It seems you Account is blocked by admin please contact boookat@gmail.com")
                }
                else {
                    const comparePassword = await bcryptPassword.comparePassword(data.password, response[0].password)
                    if (!comparePassword) {
                        throw new Error("Invalid email or password")
                    }
                    else {
                        const token = encryptionDecryption.createToken(response[0]._id as ObjectId, "user", "5h")
                        const data: { token: string, userId: ObjectId } = {
                            token: token,
                            userId: response[0]._id as ObjectId
                        }
                        return data
                    }
                }
            }
            else {
                throw new Error("user doesn't exists please signUp")
            }
        } catch (error) {
            console.log("error at signin", error)
            throw new Error((error as Error).message)
        }
    },
    checkuserExists: async (email: string) => {
        try {
            const response = await userRepository.getUser("email", email)
            if (response.length != 0) {
                if (response[0].block) {
                    throw new Error("Oops! It seems you Account is blocked by admin please contact boookat@gmail.com")
                }
                const token = encryptionDecryption.createToken(response[0]._id as ObjectId, "user", "1h")
                const data: { token: string, userId: ObjectId } = {
                    token: token,
                    userId: response[0]._id as ObjectId
                }
                return data
            }
            else {
                throw new Error("user doesn't exists please signUp")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}