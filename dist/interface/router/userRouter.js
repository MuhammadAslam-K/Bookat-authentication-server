"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegisterController_1 = __importDefault(require("../controllers/user/userRegisterController"));
const userSignInController_1 = __importDefault(require("../controllers/user/userSignInController"));
const userNotificationController_1 = __importDefault(require("../controllers/user/userNotificationController"));
const userProfileController_1 = __importDefault(require("../controllers/user/userProfileController"));
const rideController_1 = __importDefault(require("../controllers/user/rideController"));
const scheduledRideController_1 = __importDefault(require("../controllers/user/scheduledRideController"));
const userRoute = express_1.default.Router();
userRoute.post("/signup", userRegisterController_1.default.signup);
userRoute.post("/google/signUp", userRegisterController_1.default.googleSignup);
userRoute.post("/check/userExists", userRegisterController_1.default.checkUserExists);
userRoute.post("/signin", userSignInController_1.default.signin);
userRoute.post("/google/signin", userSignInController_1.default.googleSignin);
userRoute.post("/otp", userNotificationController_1.default.sendOtp);
userRoute.post("/otp/verify", userNotificationController_1.default.verifySMS);
userRoute.post("/resetPasswordLink", userNotificationController_1.default.resetPasswordLink);
userRoute.post("/resetpassword", userNotificationController_1.default.resetpassword);
userRoute.get("/profile", userProfileController_1.default.getProfile);
userRoute.post("/update/profile", userProfileController_1.default.updateProfile);
// RIDE
userRoute.post('/getdriver', rideController_1.default.getDriverData);
userRoute.post('/getridedata', rideController_1.default.getRideData);
userRoute.post('/payment', rideController_1.default.payment);
userRoute.get('/rideHistory', rideController_1.default.rides);
userRoute.get('/currentRide', rideController_1.default.currentRide);
// SCheduled Rides
userRoute.get('/scheduleRideHistory', scheduledRideController_1.default.scheduleRideHistory);
userRoute.post('/scheduleTheRide', scheduledRideController_1.default.scheduleRide);
exports.default = userRoute;
