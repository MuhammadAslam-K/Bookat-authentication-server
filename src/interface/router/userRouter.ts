import Express from "express";

import signup from "../controllers/user/userRegisterController"
import signIn from "../controllers/user/userSignInController";
import userNotificationController from "../controllers/user/userNotificationController";
import userProfileController from "../controllers/user/userProfileController";
import rideController from "../controllers/user/rideController";
import scheduledRideController from "../controllers/user/scheduledRideController";

const userRoute = Express.Router()

// AUTH
userRoute.post("/signup", signup.signup)
userRoute.post("/google/signUp", signup.googleSignup)

userRoute.post("/check/userExists", signup.checkUserExists)
userRoute.post("/signin", signIn.signin)
userRoute.post("/google/signin", signIn.googleSignin)


userRoute.post("/otp", userNotificationController.sendOtp)
userRoute.post("/otp/verify", userNotificationController.verifySMS)

userRoute.post("/resetPasswordLink", userNotificationController.resetPasswordLink)
userRoute.post("/resetpassword", userNotificationController.resetpassword)

// PROFILE
userRoute.get("/profile", userProfileController.getProfile)
userRoute.post("/update/profile", userProfileController.updateProfile)

// RIDE
userRoute.get('/details/driver', rideController.getDriverDetails);

userRoute.post('/getridedata', rideController.getRideData);
userRoute.post('/payment', rideController.payment);

userRoute.get('/currentRide', rideController.currentRide);


// SCHEDULED RIDES
userRoute.get('/scheduledRides', scheduledRideController.scheduledRides);
userRoute.post('/scheduleTheRide', scheduledRideController.scheduleRide);


// CANCELLATION
userRoute.patch('/cancelride', scheduledRideController.cancelride);

// HISTORY
userRoute.get('/history', rideController.ridesHistory);


export default userRoute