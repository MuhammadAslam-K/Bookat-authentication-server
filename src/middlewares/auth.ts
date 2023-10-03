import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default {
    createToken: async (id: any) => {
        // const secretKey = process.env.JWT_SECRET_KEY
        const secretKey = "JkChTjrw8N4z2D83h3geiNM7qfRtcZRU0isSgNgq"
        console.log("type", typeof (id));

        const payload = {
            userId: id,
        };
        const options: jwt.SignOptions = {
            expiresIn: '1h',
        };
        const token = jwt.sign(payload, secretKey, options);
        return token
    },

    // decodeToken: (req: Request, res: Response, next: NextFunction) => {



    //     const token = req.header('Authorization').replace('Bearer ', '');

    //     jwt.verify(token, "t9rXw5bF2mS7zQ8p", (err, decodedToken) => {

    //         if (err) {
    //             return res.status(401).json({ message: 'Unauthorized' });
    //         }

    //         req.token = decodedToken;
    //         next();
    //     });
    // }
}
