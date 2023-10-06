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
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryUpdateQuery"));
const encryptionDecryption_1 = __importDefault(require("../../services/encryptionDecryption"));
const nodeMailer_1 = __importDefault(require("../../services/nodeMailer"));
exports.default = {
    sendRestPasswordLink: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkUserExists = yield userRepositoryGetQuery_1.default.getUser("email", email);
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
                return yield nodeMailer_1.default.sendEmail(data);
            }
            else {
                throw new Error("Email does not Exists");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    resetPassword: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("data", data);
            const decryptedEmail = encryptionDecryption_1.default.decryptdata(data.id);
            const hashedPassword = yield encryptionDecryption_1.default.hashPassword(data.password);
            return userRepositoryUpdateQuery_1.default.updatePassword(decryptedEmail.payload, hashedPassword);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
