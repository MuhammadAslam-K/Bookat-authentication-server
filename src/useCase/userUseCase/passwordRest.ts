import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery"
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery"
import encryptionDecryption from "../../services/encryptionDecryption"
import nodeMailer from "../../services/nodeMailer"

export default {
    sendRestPasswordLink: async (email: string) => {
        try {
            const checkUserExists = await userRepositoryGetQuery.getUser("email", email)

            if (checkUserExists.length != 0) {

                if (!checkUserExists[0].password) {
                    throw new Error("Oops! It seems you signed up with Google")
                }

                const encryptedEmail = encryptionDecryption.encryptData(email, "30m")
                const data = {
                    to: email,
                    subject: "Password Reset Link",
                    message: `http://localhost:5173/resetpassword/?id=${encryptedEmail}`
                }

                return await nodeMailer.sendLink(data)
            }
            else {
                throw new Error("Email does not Exists")
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    resetPassword: async (data: { id: string, password: string }) => {
        try {

            const decryptedEmail = encryptionDecryption.decryptdata(data.id)
            const hashedPassword = await encryptionDecryption.hashPassword(data.password)
            return userRepositoryUpdateQuery.updatePassword(decryptedEmail.payload, hashedPassword)

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
