import UserSchema from "../../models/user-model"
import { signupData, userGoogleSignUp } from "../../../../business/useCase/userUseCase/userRegistrationUseCase"

export default {
    saveUser: async (data: signupData | userGoogleSignUp, refferalCode: string) => {
        try {
            const user = new UserSchema({
                ...data,
                refrel: refferalCode,
            })
            return await user.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}