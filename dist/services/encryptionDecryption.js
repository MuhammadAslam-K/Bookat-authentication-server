"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    hashPassword: (password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield bcrypt_1.default.hash(password, 10);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    comparePassword: (passwordOne, passwordTwo) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(passwordOne, passwordTwo);
    }),
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
