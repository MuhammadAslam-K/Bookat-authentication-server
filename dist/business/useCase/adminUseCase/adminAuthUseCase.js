"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptionDecryption_1 = __importDefault(require("../../shared/utilities/encryptionDecryption"));
const adminRepositoryGetQuerys_1 = __importDefault(require("../../../adapters/data-access/repositories/admin/adminRepositoryGetQuerys"));
const errorHandling_1 = require("../../errors/errorHandling");
exports.default = {
    signIn: async (data) => {
        try {
            const admnExists = await adminRepositoryGetQuerys_1.default.getAdminWithEmail(data.email);
            if (admnExists.length != 0 && admnExists[0].password == data.password) {
                return encryptionDecryption_1.default.createToken(admnExists[0]._id, "admin", "5h");
            }
            else {
                throw new Error("Unautherised access");
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
