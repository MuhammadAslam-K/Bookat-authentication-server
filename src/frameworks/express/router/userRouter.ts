import Express from "express";

import signup from "../../../adapters/controllers/user/userRegisterController"
import signIn from "../../../adapters/controllers/user/userSignInController";
import userNotificationController from "../../../adapters/controllers/user/userNotificationController";
import userProfileController from "../../../adapters/controllers/user/userProfileController";
import rideController from "../../../adapters/controllers/user/rideController";
import scheduledRideController from "../../../adapters/controllers/user/scheduledRideController";
import userHomeController from "../../../adapters/controllers/user/userHomeController";
import bookingController from "../../../adapters/controllers/user/booking-controller";

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

userRoute.patch('/getridedata', rideController.getRideData);
userRoute.post('/payment', bookingController.payment);
userRoute.post('/review', bookingController.review);

userRoute.get('/currentRide', rideController.currentRide);


// SCHEDULED RIDES
userRoute.get('/scheduledRides', scheduledRideController.scheduledRides);
userRoute.post('/scheduleTheRide', scheduledRideController.scheduleNewRide);


// CANCELLATION
userRoute.post('/cancelride', scheduledRideController.cancelride);

// HISTORY
userRoute.get('/history', rideController.ridesHistory);
userRoute.patch('/favourite', rideController.favouriteRide);

userRoute.get('/favourite/quickRide', rideController.getQuickRideInfo);
userRoute.post('/favourite/reScheduleRide', scheduledRideController.reScheduleTheRide);

// CAB
userRoute.get("/getCabs", userHomeController.getAllCabDetails)


export default userRoute