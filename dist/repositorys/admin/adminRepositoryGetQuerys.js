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
const adminEntites_1 = __importDefault(require("../../entites/adminEntites"));
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
exports.default = {
    getAdminWithEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminEntites_1.default.find({ email: email });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userEntites_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllDriver: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getSingleDriver: (driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findById(driverId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
