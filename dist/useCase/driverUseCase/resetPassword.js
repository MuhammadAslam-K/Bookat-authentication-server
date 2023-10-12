"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const encryptionDecryption_1 = __importDefault(require("../../services/encryptionDecryption"));
const nodeMailer_1 = __importDefault(require("../../services/nodeMailer"));
exports.default = {
    sendRestPasswordLink: async (email) => {
        try {
            const checkDriverExists = await driverRepositoryGetQuerys_1.default.getDriver("email", email);
            if (checkDriverExists.length != 0) {
                if (!checkDriverExists[0].password) {
                    throw new Error("Oops! It seems you signed up with Google");
                }
                const encryptedEmail = encryptionDecryption_1.default.encryptData(email, "30m");
                const data = {
                    to: email,
                    subject: "Password Reset Link",
                    message: `http://localhost:5173/driver/resetpassword/?id=${encryptedEmail}`
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
            return driverRepositoryUpdateQuerys_1.default.updatePassword(decryptedEmail.payload, hashedPassword);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
