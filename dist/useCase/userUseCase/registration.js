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
const userRepository_1 = __importDefault(require("../../repositorys/userRepository"));
exports.default = {
    register: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkEmail = yield userRepository_1.default.checkEmail(data.email);
            if (checkEmail) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const checkMobile = yield userRepository_1.default.checkMobile(data.mobile);
                if (checkMobile) {
                    throw new Error("User with the same mobile number already exists");
                }
                else {
                    const saveUser = yield userRepository_1.default.saveUser(data);
                    return true;
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    googleSignUp: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkEmail = yield userRepository_1.default.checkEmail(data.email);
            if (checkEmail) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const saveUser = yield userRepository_1.default.saveUser(data);
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
// { displayName: 'Muhammad Aslam K A', email: 'aslamka.2k3@gmail.com' }
