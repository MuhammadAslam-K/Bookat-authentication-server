import { ObjectId } from "mongoose"
import UserSchema from "../../entites/userEntites"
import { walletDetails } from "../../useCase/userUseCase/userRegistrationUseCase"
import { profileUpdate } from "../../useCase/driverUseCase/driverProfileUseCase"

export default {
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

    updatePassword: async (email: string, password: string) => {
        try {
            await UserSchema.findOneAndUpdate(
                { email },
                { password },
                { new: true }
            )
            return true
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateUserProfile: async (data: profileUpdate, userId: ObjectId) => {
        try {
            await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        ...data,
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}