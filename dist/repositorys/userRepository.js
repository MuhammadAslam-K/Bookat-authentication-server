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
const userEntites_1 = __importDefault(require("../entites/userEntites"));
exports.default = {
    checkEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findEmail = yield userEntites_1.default.find({ email: email });
            return findEmail.length != 0 ? true : false;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    checkMobile: (mobile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findMobile = yield userEntites_1.default.find({ mobile: mobile });
            return findMobile.length != 0 ? true : false;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    saveUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new userEntites_1.default(Object.assign({}, data));
            yield user.save();
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
