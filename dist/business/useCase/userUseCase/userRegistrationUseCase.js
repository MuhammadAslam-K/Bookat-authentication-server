"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery"));
const userRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery"));
const userRepositorySaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/userRepository/userRepositorySaveQuery"));
const encryptionDecryption_1 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const refrelCode_1 = require("../../shared/utilities/refrelCode");
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    registerUser: async (data) => {
        try {
            const checkRefrelCodeExists = await userRepositoryGetQuery_1.default.getUser("refrel", data.refrelCode);
            if (checkRefrelCodeExists.length != 0) {
                const walletDetails = {
                    date: Date.now(),
                    details: `${data.name} joined using your refrel`,
                    amount: 50,
                    status: "Credited"
                };
                const addAmount = await userRepositoryUpdateQuery_1.default.addAmountInWalletWithUserId(walletDetails, checkRefrelCodeExists[0]._id);
                const hashPassword = await encryptionDecryption_1.default.hashPassword(data.password);
                data.password = hashPassword;
                const refrelCode = (0, refrelCode_1.refferalCode)();
                const wallet = {
                    date: Date.now(),
                    details: `You joined using ${checkRefrelCodeExists[0].name}'s refrel`,
                    amount: 100,
                    status: "Credited"
                };
                const saveUser = await userRepositorySaveQuery_1.default.saveUser(data, refrelCode);
                await userRepositoryUpdateQuery_1.default.addAmountInWalletWithUserId(wallet, saveUser._id);
                return true;
            }
            else {
                const hashPassword = await encryptionDecryption_1.default.hashPassword(data.password);
                data.password = hashPassword;
                const refrelCode = (0, refrelCode_1.refferalCode)();
                const saveUser = await userRepositorySaveQuery_1.default.saveUser(data, refrelCode);
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    googleSignUp: async (data) => {
        try {
            const checkEmailExists = await userRepositoryGetQuery_1.default.getUser("email", data.email);
            if (checkEmailExists.length != 0) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const refrelCode = (0, refrelCode_1.refferalCode)();
                const saveUser = await userRepositorySaveQuery_1.default.saveUser(data, refrelCode);
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    checkUserExists: async (data) => {
        try {
            const checkEmailExists = await userRepositoryGetQuery_1.default.getUser("email", data.email);
            if (checkEmailExists.length != 0) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const checkMobileExists = await userRepositoryGetQuery_1.default.getUser("mobile", data.mobile);
                if (checkMobileExists.length != 0) {
                    throw new Error("User with the same mobile number already exists");
                }
                else {
                    return true;
                }
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
