import bcrypt from "bcrypt";

export default {
    hashPassword: async (password: string): Promise<string> => {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    comparePassword: async (passwordOne: string, passwordTwo: string) => {
        return await bcrypt.compare(passwordOne, passwordTwo);
    },
};
