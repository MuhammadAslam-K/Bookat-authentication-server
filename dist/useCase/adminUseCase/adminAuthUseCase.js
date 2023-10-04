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
const adminRepository_1 = __importDefault(require("../../repositorys/adminRepository"));
exports.default = {
    signIn: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admnExists = yield adminRepository_1.default.getAdminWithEmail(data.email);
            if (admnExists.length != 0 && admnExists[0].password == data.password) {
                return jwtTokenAuth_1.default.createToken(admnExists[0]._id);
            }
            else {
                throw new Error("Unautherised access");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
