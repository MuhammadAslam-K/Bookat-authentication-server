import { ObjectId } from "mongoose";
import driverRepository from "../../repositorys/driverRepository"
import bcryptPassword from "../../services/bcryptPassword";
import { refferalCode } from "../../utils/refrelCode";
import { signupData } from "../userUseCase/registration"
import { walletDetails } from "../userUseCase/registration";

export default {
    signup: async (data: signupData) => {
        try {
            const checkEmailExists = await driverRepository.findDriverWithEmail(data.email)

            if (checkEmailExists.length != 0) {
                throw new Error("Driver already exists. Please sign in.");
            }
            else {
                const checkMobileExists = await driverRepository.findDriverWithMobile(data.mobile)

                if (checkMobileExists.length != 0) {
                    throw new Error("Driver with the same mobile number already exists");
                }
                else {
                    const checkRefrelCodeExists = await driverRepository.getDriverWithRefrelCode(data.refrelCode)

                    if (checkRefrelCodeExists.length != 0) {
                        const walletDetails: walletDetails = {
                            date: Date.now(),
                            details: `${data.name} joined using your refrel`,
                            amount: 50,
                            status: "Credited"
                        }
                        const addAmount = await driverRepository.addAmountInWallet(walletDetails, checkRefrelCodeExists[0]._id as ObjectId)

                        const hashPassword = await bcryptPassword.hashPassword(data.password)
                        data.password = hashPassword
                        const refrelCode = refferalCode()
                        const wallet: walletDetails = {
                            date: Date.now(),
                            details: `You joined using your ${checkRefrelCodeExists[0].name}'s refrel`,
                            amount: 100,
                            status: "Credited"
                        }
                        const saveDriver = await driverRepository.saveDriver(data, refrelCode)
                        await driverRepository.addAmountInWallet(wallet, saveDriver._id as ObjectId)
                        return true
                    }
                    else {
                        const hashPassword = await bcryptPassword.hashPassword(data.password)
                        data.password = hashPassword
                        const refrelCode = refferalCode()
                        const saveUser = await driverRepository.saveDriver(data, refrelCode)
                        return true
                    }
                }
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}