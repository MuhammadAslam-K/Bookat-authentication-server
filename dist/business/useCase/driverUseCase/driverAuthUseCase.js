"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptionDecryption_1 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const refrelCode_1 = require("../../shared/utilities/refrelCode");
const driverRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"));
const driverRepositorySaveQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/driverRepository/driverRepositorySaveQuerys"));
const encryptionDecryption_2 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    signup: async (data) => {
        try {
            const checkRefrelCodeExists = await driverRepositoryGetQuerys_1.default.getDriver("refrel", data.refrelCode);
            if (checkRefrelCodeExists.length != 0) {
                const walletDetails = {
                    date: Date.now(),
                    details: `${data.name} joined using your refrel`,
                    amount: 50,
                    status: "Credited"
                };
                const addAmount = await driverRepositoryUpdateQuerys_1.default.addAmountInWallet(walletDetails, checkRefrelCodeExists[0]._id);
                const hashPassword = await encryptionDecryption_1.default.hashPassword(data.password);
                data.password = hashPassword;
                const refrelCode = (0, refrelCode_1.refferalCode)();
                const wallet = {
                    date: Date.now(),
                    details: `You joined using your ${checkRefrelCodeExists[0].name}'s refrel`,
                    amount: 100,
                    status: "Credited"
                };
                const saveDriver = await driverRepositorySaveQuerys_1.default.saveDriver(data, refrelCode);
                await driverRepositoryUpdateQuerys_1.default.addAmountInWallet(wallet, saveDriver._id);
                return true;
            }
            else {
                const hashPassword = await encryptionDecryption_1.default.hashPassword(data.password);
                data.password = hashPassword;
                const refrelCode = (0, refrelCode_1.refferalCode)();
                const saveUser = await driverRepositorySaveQuerys_1.default.saveDriver(data, refrelCode);
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    login: async (data) => {
        try {
            const driverExist = await driverRepositoryGetQuerys_1.default.getDriver("email", data.email);
            if (driverExist.length != 0) {
                const comparePassword = await encryptionDecryption_1.default.comparePassword(data.password, driverExist[0].password);
                if (!comparePassword) {
                    throw new Error("Invalid email or password");
                }
                else if (driverExist[0].block) {
                    throw new Error('Your account has been blocked by admin please contact bookat@gmail.com');
                }
                else {
                    const token = encryptionDecryption_2.default.createToken(driverExist[0]._id, "driver", "5h");
                    let response;
                    const vehicleType = driverExist[0].vehicleDocuments.vehicleType;
                    if (driverExist[0].driver.driverDocuments) {
                        if (driverExist[0].vehicle.vehicleDocuments) {
                            response = { driverId: driverExist[0]._id, vehicleType: vehicleType, token, document: true, vehicle: true };
                        }
                        else {
                            response = { driverId: driverExist[0]._id, vehicleType: vehicleType, token, document: true, vehicle: false };
                        }
                    }
                    else {
                        response = { driverId: driverExist[0]._id, vehicleType: vehicleType, token, document: false, vehicle: false };
                    }
                    return response;
                }
            }
            else {
                throw new Error("please create an account");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    checkDriverExists: async (data) => {
        try {
            const checkEmailExists = await driverRepositoryGetQuerys_1.default.getDriver("email", data.email);
            if (checkEmailExists.length != 0) {
                throw new Error("Driver already exists. Please sign in.");
            }
            else {
                const checkMobileExists = await driverRepositoryGetQuerys_1.default.getDriver("mobile", data.mobile);
                if (checkMobileExists.length != 0) {
                    throw new Error("Driver with the same mobile number already exists");
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
