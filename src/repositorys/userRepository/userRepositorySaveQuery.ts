import UserSchema from "../../entites/userEntites"
import { signupData, userGoogleSignUp } from "../../useCase/userUseCase/userRegistrationUseCase"

export default {
    saveUser: async (data: signupData | userGoogleSignUp, refferalCode: string) => {
        try {
            const user = new UserSchema({
                ...data,
                refrel: refferalCode
            })
            return await user.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}