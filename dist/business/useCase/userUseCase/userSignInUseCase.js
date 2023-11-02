"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"));
const encryptionDecryption_1 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const encryptionDecryption_2 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    validateUser: async (data) => {
        try {
            const response = await userRepositoryGetQuery_1.default.getUser("email", data.email);
            if (response.length != 0) {
                if (!response[0].password) {
                    throw new Error("Oops! It seems you signed up with Google");
                }
                else if (response[0].block) {
                    throw new Error("Oops! It seems you Account is blocked by admin please contact boookat@gmail.com");
                }
                else {
                    const comparePassword = await encryptionDecryption_1.default.comparePassword(data.password, response[0].password);
                    if (!comparePassword) {
                        throw new Error("Invalid email or password");
                    }
                    else {
                        const token = encryptionDecryption_2.default.createToken(response[0]._id, "user", "5h");
                        const data = {
                            token: token,
                            userId: response[0]._id,
                            mobile: response[0].mobile
                        };
                        return data;
                    }
                }
            }
            else {
                throw new Error("user doesn't exists please signUp");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    checkuserExists: async (email) => {
        try {
            const response = await userRepositoryGetQuery_1.default.getUser("email", email);
            if (response.length != 0) {
                if (response[0].block) {
                    throw new Error("Oops! It seems you Account is blocked by admin please contact boookat@gmail.com");
                }
                const token = encryptionDecryption_2.default.createToken(response[0]._id, "user", "1h");
                const data = {
                    token: token,
                    userId: response[0]._id
                };
                return data;
            }
            else {
                throw new Error("user doesn't exists please signUp");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
