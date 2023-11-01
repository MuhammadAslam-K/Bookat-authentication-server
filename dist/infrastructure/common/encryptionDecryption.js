"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    hashPassword: async (password) => {
        try {
            return await bcrypt_1.default.hash(password, 10);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    comparePassword: async (passwordOne, passwordTwo) => {
        return await bcrypt_1.default.compare(passwordOne, passwordTwo);
    },
    createToken: (data, role, expireIn) => {
        try {
            const secretKey = process.env.SECRET_KEY;
            const payload = {
                data: data,
                role: role,
            };
            const options = {
                expiresIn: expireIn,
            };
            if (secretKey) {
                const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
                return token;
            }
            else {
                throw new Error("Unable to create Token please try agian later");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    encryptData: (data, expireIn) => {
        try {
            const secretKey = process.env.SECRET_KEY || "";
            const payload = {
                payload: data,
            };
            const options = {
                expiresIn: expireIn,
            };
            const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
            return token;
        }
        catch (error) {
            console.error('Encryption error:', error);
            throw new Error(error.message);
        }
    },
    decryptdata: (data) => {
        try {
            const secretKey = process.env.SECRET_KEY || "";
            const decodedToken = jsonwebtoken_1.default.verify(data, secretKey);
            return decodedToken;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
