import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export default {
    createToken: async (id: ObjectId) => {
        try {
            const secretKey = "JkChTjrw8N4z2D83h3geiNM7qfRtcZRU0isSgNgq"

            const payload = {
                userId: id,
            };
            const options: jwt.SignOptions = {
                expiresIn: '1h',
            };
            const token = jwt.sign(payload, secretKey, options);
            return token
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    decodeToken: (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.header('Authorization');

            if (!authorizationHeader) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const token = authorizationHeader.replace('Bearer ', '');

            jwt.verify(token, "JkChTjrw8N4z2D83h3geiNM7qfRtcZRU0isSgNgq", (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: (err).message });
                }

                req.token = decodedToken;
                next();
            });
        }
        catch (error) {
            return res.status(401).json({ message: (error as Error).message });

        }

    }
}
