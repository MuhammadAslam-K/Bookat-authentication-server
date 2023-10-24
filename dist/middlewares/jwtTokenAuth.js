"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptionDecryption_1 = __importDefault(require("../services/encryptionDecryption"));
exports.default = {
    validateToken: (req, res, next) => {
        try {
            const requestedRoute = req.path;
            console.log("path :", requestedRoute);
            const publicRoutes = [
                /**********  User **********/
                "/signUp",
                "/google/signUp",
                "/signin",
                "/google/signin",
                "/check/userExists",
                "/otp",
                "/otp/verify",
                "/resetPasswordLink",
                "/resetpassword",
                /**********  Driver **********/
                "/driver/signup",
                "/driver/login",
                "/driver/check/driverExists",
                "/driver/resetPasswordLink",
                "/driver/resetpassword",
                /**********  Admin **********/
                "/admin/login",
                "/socket.io"
            ];
            if (publicRoutes.includes(requestedRoute)) {
                return next();
            }
            const authorizationHeader = req.header('Authorization');
            if (!authorizationHeader) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const token = authorizationHeader.replace('Bearer ', '');
            const decodedToken = encryptionDecryption_1.default.decryptdata(token);
            if (decodedToken.role === 'admin') {
                req.token = decodedToken;
                next();
            }
            else if (decodedToken.role === 'user') {
                req.token = decodedToken;
                next();
            }
            else if (decodedToken.role === 'driver') {
                req.token = decodedToken;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        catch (error) {
            console.log("error in jwt ", error);
            return res.status(401).json({ error: error.message });
        }
    },
};
