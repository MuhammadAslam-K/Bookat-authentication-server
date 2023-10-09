import { NextFunction, Request, Response } from 'express';
import encryptionDecryption from '../services/encryptionDecryption';

export default {

    validateToken: (req: Request, res: Response, next: NextFunction) => {
        try {
            const requestedRoute = req.path;
            const publicRoutes = [
                /**********  User **********/
                "/signup",
                "/google/signup",
                "/login",
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
                "/admin/login"
            ]

            if (publicRoutes.includes(requestedRoute)) {
                return next();
            }
            const authorizationHeader = req.header('Authorization');

            if (!authorizationHeader) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const token = authorizationHeader.replace('Bearer ', '');

            const decodedToken = encryptionDecryption.decryptdata(token)


            if (decodedToken.role === 'admin') {

                req.token = decodedToken;
                next();
            } else if (decodedToken.role === 'user') {

                req.token = decodedToken;
                next();
            } else if (decodedToken.role === 'driver') {
                req.token = decodedToken;
                next();
            }
            else {
                return res.status(401).json({ error: 'Unauthorized' });
            }

        }
        catch (error) {
            return res.status(401).json({ error: (error as Error).message });

        }

    },

}
