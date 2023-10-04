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
const jwtTokenAuth_1 = __importDefault(require("../../middlewares/jwtTokenAuth"));
const userRepositoryGetQuery_1 = __importDefault(require("../../repositorys/userRepository/userRepositoryGetQuery"));
const bcryptPassword_1 = __importDefault(require("../../services/bcryptPassword"));
exports.default = {
    validateUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield userRepositoryGetQuery_1.default.getUserWithEmail(data.email);
            if (response.length != 0) {
                if (!response[0].password) {
                    throw new Error("please signIn with Google");
                }
                else {
                    const comparePassword = yield bcryptPassword_1.default.comparePassword(data.password, response[0].password);
                    if (!comparePassword) {
                        throw new Error("Invalid email or password");
                    }
                    else {
                        return jwtTokenAuth_1.default.createToken(response[0]._id);
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
            const response = yield userRepositoryGetQuery_1.default.getUserWithEmail(email);
            if (response.length != 0) {
                return jwtTokenAuth_1.default.createToken(response[0]._id);
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
