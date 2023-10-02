import UserSchema from "../entites/userEntites"
import { userSignup, userGoogleSignUp } from "../useCase/userUseCase/registration"


export default {
    checkEmail: async (email: string) => {
        try {
            const findEmail = await UserSchema.find({ email: email })
            return findEmail.length != 0 ? true : false
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    checkMobile: async (mobile: string) => {
        try {
            const findMobile = await UserSchema.find({ mobile: mobile })
            return findMobile.length != 0 ? true : false
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    saveUser: async (data: userSignup | userGoogleSignUp) => {
        try {
            const user = new UserSchema({
                ...data,
            })
            await user.save()

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}