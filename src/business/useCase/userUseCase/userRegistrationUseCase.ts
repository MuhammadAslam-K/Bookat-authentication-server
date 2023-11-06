import { ObjectId } from 'mongoose';
import userRepositoryGetQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"
import userRepositoryUpdateQuery from '../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery';
import userRepositorySaveQuery from '../../../adapters/data-access/repositories/userRepository/userRepositorySaveQuery';
import encryptionDecryption from "../../shared/utilities/encryptionDecryption";
import { refferalCode } from "../../shared/utilities/refrelCode";
import { handleError } from '../../errors/errorHandling';

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
                const addAmount = await userRepositoryUpdateQuery.addAmountInWalletWithUserId(walletDetails, checkRefrelCodeExists[0]._id as ObjectId)

                const hashPassword = await encryptionDecryption.hashPassword(data.password)
                data.password = hashPassword
                const refrelCode = refferalCode()
                const wallet: walletDetails = {
                    date: Date.now(),
                    details: `You joined using ${checkRefrelCodeExists[0].name}'s refrel`,
                    amount: 100,
                    status: "Credited"
                }
                const saveUser = await userRepositorySaveQuery.saveUser(data, refrelCode)
                await userRepositoryUpdateQuery.addAmountInWalletWithUserId(wallet, saveUser._id as ObjectId)
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
            handleError(error as Error)
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
            handleError(error as Error)
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
            handleError(error as Error)
        }
    }
}
