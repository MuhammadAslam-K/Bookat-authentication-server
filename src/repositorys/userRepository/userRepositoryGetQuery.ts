import UserSchema from "../../entites/userEntites"


export default {
    getUserWithEmail: async (email: string) => {
        try {
            return await UserSchema.find({ email: email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserWithMobile: async (mobile: string) => {
        try {
            return await UserSchema.find({ mobile: mobile })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserWithRefrelCode: async (refrelCode: string) => {
        try {
            return await UserSchema.find({ refrel: refrelCode })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },


}