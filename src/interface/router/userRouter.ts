import Express from "express";

import signup from "../controllers/user/userRegisterController"
import signIn from "../controllers/user/userSignInController";
import userNotificationController from "../controllers/user/userNotificationController";
import userProfileController from "../controllers/user/userProfileController";
import rideController from "../controllers/user/rideController";
import scheduledRideController from "../controllers/user/scheduledRideController";

const userRoute = Express.Router()

userRoute.post("/signup", signup.signup)
userRoute.post("/google/signUp", signup.googleSignup)

userRoute.post("/check/userExists", signup.checkUserExists)
userRoute.post("/signin", signIn.signin)
userRoute.post("/google/signin", signIn.googleSignin)


userRoute.post("/otp", userNotificationController.sendOtp)
userRoute.post("/otp/verify", userNotificationController.verifySMS)

userRoute.post("/resetPasswordLink", userNotificationController.resetPasswordLink)
userRoute.post("/resetpassword", userNotificationController.resetpassword)

userRoute.get("/profile", userProfileController.getProfile)
userRoute.post("/update/profile", userProfileController.updateProfile)

// RIDE
userRoute.post('/getdriver', rideController.getDriverData);
userRoute.post('/getridedata', rideController.getRideData);
userRoute.post('/payment', rideController.payment);

userRoute.get('/rideHistory', rideController.rides);

// SCheduled Rides
userRoute.get('/scheduleRideHistory', scheduledRideController.scheduleRideHistory);

userRoute.post('/scheduleTheRide', scheduledRideController.scheduleRide);

export default userRoute