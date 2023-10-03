import { ObjectId } from "mongoose"
import UserSchema from "../entites/userEntites"
import { signupData, userGoogleSignUp, walletDetails } from "../useCase/userUseCase/registration"


export default {
    getUserWithEmail: async (email: string) => {
        try {
            return await UserSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserWithMobile: async (mobile: string) => {
        try {
            return await UserSchema.find({ mobile: mobile })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserWithRefrelCode: async (refrelCode: string) => {
        try {
            return await UserSchema.find({ refrel: refrelCode })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    addAmountInWallet: async (details: walletDetails, userId: ObjectId) => {
        try {
            return await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        'wallet.transactions': details
                    },
                    $inc: {
                        'wallet.balance': details.amount
                    },
                },
                { new: true },

            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
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