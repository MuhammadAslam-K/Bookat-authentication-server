import auth from "../../middlewares/auth"
import userRepository from "../../repositorys/userRepository"
import bcryptPassword from "../../services/bcryptPassword"

export default {
    validateUser: async (data: { email: string, password: string }) => {
        try {
            const response = await userRepository.getUserWithEmail(data.email)
            if (response.length != 0) {
                if (!response[0].password) {
                    throw new Error("please signIn with Google")
                }
                else {
                    const comparePassword = await bcryptPassword.comparePassword(data.password, response[0].password)
                    if (!comparePassword) {
                        throw new Error("Invalid email or password")
                    }
                    else {
                        return auth.createToken(response[0]._id)
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
            const response = await userRepository.getUserWithEmail(email)
            if (response.length != 0) {
                return auth.createToken(response[0]._id)
            }
            else {
                throw new Error("user doesn't exists please signUp")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}