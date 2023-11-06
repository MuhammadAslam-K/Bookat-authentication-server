import { ObjectId } from "mongoose"
import UserSchema from "../../models/user-model"
import { walletDetails } from "../../../../business/useCase/userUseCase/userRegistrationUseCase"
import { profileUpdate } from "../../../../business/useCase/driverUseCase/driverProfileUseCase"

export default {
    addAmountInWalletWithUserId: async (details: walletDetails, userId: ObjectId) => {
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
            return await UserSchema.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        name: data.name,
                        email: data.email,
                        mobile: data.mobile,
                    }
                },
                { new: true }
            )
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateTotalRide: async (userId: ObjectId) => {
        try {
            return await UserSchema.findByIdAndUpdate(
                userId,
                { $inc: { 'RideDetails.completedRides': 1 } }
            );

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateCancelledRides: async (userId: ObjectId) => {
        try {
            const result = await UserSchema.findByIdAndUpdate(
                userId,
                { $inc: { 'RideDetails.cancelledRides': 1 } }
            );
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}