import { handleError } from "../../errors/errorHandling"
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"
import driverRepositoryUpdateQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"
import encryptionDecryption from "../../shared/utilities/encryptionDecryption"
import nodeMailer from "../../../adapters/external-services/email/nodeMailer"

export default {
    sendRestPasswordLink: async (email: string) => {
        try {
            const checkDriverExists = await driverRepositoryGetQuerys.getDriver("email", email)

            if (checkDriverExists.length != 0) {

                if (!checkDriverExists[0].password) {
                    throw new Error("Oops! It seems you signed up with Google")
                }

                const encryptedEmail = encryptionDecryption.encryptData(email, "30m")
                const data = {
                    to: email,
                    subject: "Password Reset Link",
                    message: `http://localhost:5173/driver/resetpassword/?id=${encryptedEmail}`
                }

                return await nodeMailer.sendLink(data)
            }
            else {
                throw new Error("Email does not Exists")
            }
        } catch (error) {
            handleError(error as Error)
        }
    },

    resetPassword: async (data: { id: string, password: string }) => {
        try {
            const decryptedEmail = encryptionDecryption.decryptdata(data.id)


            const hashedPassword = await encryptionDecryption.hashPassword(data.password)
            return driverRepositoryUpdateQuerys.updatePassword(decryptedEmail.payload, hashedPassword)

        } catch (error) {
            handleError(error as Error)
        }
    }
}