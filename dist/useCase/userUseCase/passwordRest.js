"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
const encryptionDecryption_1 = __importDefault(require("../../services/encryptionDecryption"));
const nodeMailer_1 = __importDefault(require("../../services/nodeMailer"));
exports.default = {
    sendRestPasswordLink: async (email) => {
        try {
            const checkUserExists = await userRepositoryGetQuery_1.default.getUser("email", email);
            if (checkUserExists.length != 0) {
                if (!checkUserExists[0].password) {
                    throw new Error("Oops! It seems you signed up with Google");
                }
                const encryptedEmail = encryptionDecryption_1.default.encryptData(email, "30m");
                const data = {
                    to: email,
                    subject: "Password Reset Link",
                    message: `http://localhost:5173/resetpassword/?id=${encryptedEmail}`
                };
                return await nodeMailer_1.default.sendLink(data);
            }
            else {
                throw new Error("Email does not Exists");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    resetPassword: async (data) => {
        try {
            const decryptedEmail = encryptionDecryption_1.default.decryptdata(data.id);
            const hashedPassword = await encryptionDecryption_1.default.hashPassword(data.password);
            return userRepositoryUpdateQuery_1.default.updatePassword(decryptedEmail.payload, hashedPassword);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
