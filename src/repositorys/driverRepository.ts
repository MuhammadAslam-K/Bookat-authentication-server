import { ObjectId } from "mongoose"
import DriverSchema from "../entites/driverEntites"
import { signupData, walletDetails } from "../useCase/userUseCase/registration"

export default {
    findDriverWithEmail: async (email: string) => {
        try {
            return await DriverSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findDriverWithMobile: async (mobile: string) => {
        try {
            return await DriverSchema.find({ mobile: mobile })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getDriverWithRefrelCode: async (refrelCode: string) => {
        try {
            return await DriverSchema.find({ refrel: refrelCode })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    addAmountInWallet: async (details: walletDetails, driverId: ObjectId) => {
        try {
            return await DriverSchema.findByIdAndUpdate(
                driverId,
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
    saveDriver: async (data: signupData, refferalCode: string) => {
        try {
            const driver = new DriverSchema({
                ...data,
                refrel: refferalCode
            })
            return await driver.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}