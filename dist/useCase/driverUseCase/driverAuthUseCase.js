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
const bcryptPassword_1 = __importDefault(require("../../services/bcryptPassword"));
const refrelCode_1 = require("../../utils/refrelCode");
const jwtTokenAuth_1 = __importDefault(require("../../middlewares/jwtTokenAuth"));
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
const driverRepositorySaveQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositorySaveQuerys"));
exports.default = {
    signup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkEmailExists = yield driverRepositoryGetQuerys_1.default.findDriverWithEmail(data.email);
            if (checkEmailExists.length != 0) {
                throw new Error("Driver already exists. Please sign in.");
            }
            else {
                const checkMobileExists = yield driverRepositoryGetQuerys_1.default.findDriverWithMobile(data.mobile);
                if (checkMobileExists.length != 0) {
                    throw new Error("Driver with the same mobile number already exists");
                }
                else {
                    const checkRefrelCodeExists = yield driverRepositoryGetQuerys_1.default.getDriverWithRefrelCode(data.refrelCode);
                    if (checkRefrelCodeExists.length != 0) {
                        const walletDetails = {
                            date: Date.now(),
                            details: `${data.name} joined using your refrel`,
                            amount: 50,
                            status: "Credited"
                        };
                        const addAmount = yield driverRepositoryUpdateQuerys_1.default.addAmountInWallet(walletDetails, checkRefrelCodeExists[0]._id);
                        const hashPassword = yield bcryptPassword_1.default.hashPassword(data.password);
                        data.password = hashPassword;
                        const refrelCode = (0, refrelCode_1.refferalCode)();
                        const wallet = {
                            date: Date.now(),
                            details: `You joined using your ${checkRefrelCodeExists[0].name}'s refrel`,
                            amount: 100,
                            status: "Credited"
                        };
                        const saveDriver = yield driverRepositorySaveQuerys_1.default.saveDriver(data, refrelCode);
                        yield driverRepositoryUpdateQuerys_1.default.addAmountInWallet(wallet, saveDriver._id);
                        return true;
                    }
                    else {
                        const hashPassword = yield bcryptPassword_1.default.hashPassword(data.password);
                        data.password = hashPassword;
                        const refrelCode = (0, refrelCode_1.refferalCode)();
                        const saveUser = yield driverRepositorySaveQuerys_1.default.saveDriver(data, refrelCode);
                        return true;
                    }
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const driverExist = yield driverRepositoryGetQuerys_1.default.findDriverWithEmail(data.email);
            if (driverExist.length != 0) {
                const comparePassword = yield bcryptPassword_1.default.comparePassword(data.password, driverExist[0].password);
                if (!comparePassword) {
                    throw new Error("Invalid email or password");
                }
                else {
                    return jwtTokenAuth_1.default.createToken(driverExist[0]._id);
                }
            }
            else {
                throw new Error("please create an account");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
