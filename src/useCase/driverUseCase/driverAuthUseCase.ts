import { ObjectId } from "mongoose";
import bcryptPassword from "../../services/bcryptPassword";
import { refferalCode } from "../../utils/refrelCode";
import { signupData } from "../userUseCase/userRegistrationUseCase"
import { walletDetails } from "../userUseCase/userRegistrationUseCase";
import auth from "../../middlewares/jwtTokenAuth";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys";
import driverRepositorySaveQuerys from "../../repositorys/driverRepository/driverRepositorySaveQuerys";


export default {
    signup: async (data: signupData) => {
        try {
            const checkEmailExists = await driverRepositoryGetQuerys.findDriverWithEmail(data.email)

            if (checkEmailExists.length != 0) {
                throw new Error("Driver already exists. Please sign in.");
            }
            else {
                const checkMobileExists = await driverRepositoryGetQuerys.findDriverWithMobile(data.mobile)

                if (checkMobileExists.length != 0) {
                    throw new Error("Driver with the same mobile number already exists");
                }
                else {
                    const checkRefrelCodeExists = await driverRepositoryGetQuerys.getDriverWithRefrelCode(data.refrelCode)

                    if (checkRefrelCodeExists.length != 0) {
                        const walletDetails: walletDetails = {
                            date: Date.now(),
                            details: `${data.name} joined using your refrel`,
                            amount: 50,
                            status: "Credited"
                        }
                        const addAmount = await driverRepositoryUpdateQuerys.addAmountInWallet(walletDetails, checkRefrelCodeExists[0]._id as ObjectId)

                        const hashPassword = await bcryptPassword.hashPassword(data.password)
                        data.password = hashPassword
                        const refrelCode = refferalCode()
                        const wallet: walletDetails = {
                            date: Date.now(),
                            details: `You joined using your ${checkRefrelCodeExists[0].name}'s refrel`,
                            amount: 100,
                            status: "Credited"
                        }
                        const saveDriver = await driverRepositorySaveQuerys.saveDriver(data, refrelCode)
                        await driverRepositoryUpdateQuerys.addAmountInWallet(wallet, saveDriver._id as ObjectId)
                        return true
                    }
                    else {
                        const hashPassword = await bcryptPassword.hashPassword(data.password)
                        data.password = hashPassword
                        const refrelCode = refferalCode()
                        const saveUser = await driverRepositorySaveQuerys.saveDriver(data, refrelCode)
                        return true
                    }
                }
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    login: async (data: { email: string, password: string }) => {
        try {
            const driverExist = await driverRepositoryGetQuerys.findDriverWithEmail(data.email)

            if (driverExist.length != 0) {
                const comparePassword = await bcryptPassword.comparePassword(data.password, driverExist[0].password,)

                if (!comparePassword) {
                    throw new Error("Invalid email or password")
                }
                else {
                    return auth.createToken(driverExist[0]._id as ObjectId)
                }

            }
            else {
                throw new Error("please create an account")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}