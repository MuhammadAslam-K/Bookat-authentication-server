import { NextFunction, Request, Response } from 'express';
import encryptionDecryption from '../services/encryptionDecryption';

export default {

    decodeToken: (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.header('Authorization');

            if (!authorizationHeader) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = authorizationHeader.replace('Bearer ', '');

            const decodedToken = encryptionDecryption.decryptdata(token)

            req.token = decodedToken;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: (error as Error).message });

        }

    }
}
