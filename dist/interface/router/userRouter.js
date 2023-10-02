"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/user/signup"));
const userRoute = express_1.default.Router();
userRoute.post("/signup", signup_1.default.signup);
userRoute.post("/google/signup", signup_1.default.googleSignup);
exports.default = userRoute;
