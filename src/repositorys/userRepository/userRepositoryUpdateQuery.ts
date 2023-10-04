import { ObjectId } from "mongoose"
import UserSchema from "../../entites/userEntites"
import { walletDetails } from "../../useCase/userUseCase/userRegistrationUseCase"

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
}