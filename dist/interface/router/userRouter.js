"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegisterController_1 = __importDefault(require("../controllers/user/userRegisterController"));
const userSignInController_1 = __importDefault(require("../controllers/user/userSignInController"));
const userRoute = express_1.default.Router();
userRoute.post("/signup", userRegisterController_1.default.signup);
userRoute.post("/google/signup", userRegisterController_1.default.googleSignup);
userRoute.post("/signin", userSignInController_1.default.signin);
userRoute.post("/google/signin", userSignInController_1.default.googleSignin);
exports.default = userRoute;
