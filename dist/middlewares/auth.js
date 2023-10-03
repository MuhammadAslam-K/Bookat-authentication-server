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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    createToken: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // const secretKey = process.env.JWT_SECRET_KEY
        const secretKey = "JkChTjrw8N4z2D83h3geiNM7qfRtcZRU0isSgNgq";
        console.log("type", typeof (id));
        const payload = {
            userId: id,
        };
        const options = {
            expiresIn: '1h',
        };
        const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
        return token;
    }),
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
};
