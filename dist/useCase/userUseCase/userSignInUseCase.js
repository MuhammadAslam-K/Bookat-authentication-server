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
const encryptionDecryption_1 = __importDefault(require("../../services/encryptionDecryption"));
const encryptionDecryption_2 = __importDefault(require("../../services/encryptionDecryption"));
exports.default = {
    validateUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield userRepositoryGetQuery_1.default.getUser("email", data.email);
            if (response.length != 0) {
                if (!response[0].password) {
                    throw new Error("Oops! It seems you signed up with Google");
                }
                else {
                    const comparePassword = yield encryptionDecryption_1.default.comparePassword(data.password, response[0].password);
                    if (!comparePassword) {
                        throw new Error("Invalid email or password");
                    }
                    else {
                        return encryptionDecryption_2.default.createToken(response[0]._id, "user", "1h");
                    }
                }
            }
            else {
                throw new Error("user doesn't exists please signUp");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    checkuserExists: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield userRepositoryGetQuery_1.default.getUser("email", email);
            if (response.length != 0) {
                return encryptionDecryption_2.default.createToken(response[0]._id, "user", "1h");
            }
            else {
                throw new Error("user doesn't exists please signUp");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
