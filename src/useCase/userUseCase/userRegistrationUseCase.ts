import { ObjectId } from 'mongoose';
import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery"
import userRepositoryUpdateQuery from '../../repositorys/userRepository/userRepositoryUpdateQuery';
import userRepositorySaveQuery from '../../repositorys/userRepository/userRepositorySaveQuery';
import encryptionDecryption from "../../services/encryptionDecryption";
import { refferalCode } from "../../utils/refrelCode";

export interface signupData {
    name: string,
    email: string,
    mobile: string,
    password: string,
    refrelCode: string
}

export interface userGoogleSignUp {
    name: string,
    email: string,
}

export interface walletDetails {
    date: number,
    details: string,
    amount: number,
    status: string
}

export default {
    registerUser: async (data: signupData) => {
        try {

            const checkRefrelCodeExists = await userRepositoryGetQuery.getUser("refrel", data.refrelCode)

            if (checkRefrelCodeExists.length != 0) {
                const walletDetails: walletDetails = {
                    date: Date.now(),
                    details: `${data.name} joined using your refrel`,
                    amount: 50,
                    status: "Credited"
                }
                const addAmount = await userRepositoryUpdateQuery.addAmountInWallet(walletDetails, checkRefrelCodeExists[0]._id as ObjectId)

                const hashPassword = await encryptionDecryption.hashPassword(data.password)
                data.password = hashPassword
                const refrelCode = refferalCode()
                const wallet: walletDetails = {
                    date: Date.now(),
                    details: `You joined using your ${checkRefrelCodeExists[0].name}'s refrel`,
                    amount: 100,
                    status: "Credited"
                }
                const saveUser = await userRepositorySaveQuery.saveUser(data, refrelCode)
                await userRepositoryUpdateQuery.addAmountInWallet(wallet, saveUser._id as ObjectId)
                return true
            }
            else {
                const hashPassword = await encryptionDecryption.hashPassword(data.password)
                data.password = hashPassword
                const refrelCode = refferalCode()
                const saveUser = await userRepositorySaveQuery.saveUser(data, refrelCode)
                return true
            }


        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    googleSignUp: async (data: userGoogleSignUp) => {
        try {
            const checkEmailExists = await userRepositoryGetQuery.getUser("email", data.email)

            if (checkEmailExists.length != 0) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const refrelCode = refferalCode()
                const saveUser = await userRepositorySaveQuery.saveUser(data, refrelCode)
                return true
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    checkUserExists: async (data: { email: string, mobile: string }) => {
        try {
            const checkEmailExists = await userRepositoryGetQuery.getUser("email", data.email)

            if (checkEmailExists.length != 0) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const checkMobileExists = await userRepositoryGetQuery.getUser("mobile", data.mobile)

                if (checkMobileExists.length != 0) {
                    throw new Error("User with the same mobile number already exists");
                }
                else {
                    return true
                }
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
