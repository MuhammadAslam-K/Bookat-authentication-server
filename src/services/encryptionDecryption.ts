import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ObjectId } from "mongoose";



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

    encryptData: (data: string | ObjectId, expireIn: string): string => {
        try {
            const secretKey = process.env.SECRET_KEY || ""

            const payload = {
                payload: data,
            };
            const options: jwt.SignOptions = {
                expiresIn: expireIn,
            };
            const token = jwt.sign(payload, secretKey, options);
            return token


        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error((error as Error).message)
        }

    },

    decryptdata: (data: string) => {
        try {
            const secretKey = process.env.SECRET_KEY || ""

            const decodedToken = jwt.verify(data, secretKey) as JwtPayload;
            return decodedToken
        }
        catch (error) {
            throw new Error((error as Error).message)
        }
    }
};
