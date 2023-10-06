"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptionDecryption_1 = __importDefault(require("../services/encryptionDecryption"));
exports.default = {
    decodeToken: (req, res, next) => {
        try {
            const authorizationHeader = req.header('Authorization');
            if (!authorizationHeader) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const token = authorizationHeader.replace('Bearer ', '');
            const decodedToken = encryptionDecryption_1.default.decryptdata(token);
            req.token = decodedToken;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
};
