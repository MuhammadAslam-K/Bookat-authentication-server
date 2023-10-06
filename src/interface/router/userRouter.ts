import Express from "express";

import signup from "../controllers/user/userRegisterController"
import signIn from "../controllers/user/userSignInController";
import userNotificationController from "../controllers/user/userNotificationController";

const userRoute = Express.Router()

userRoute.post("/signup", signup.signup)
userRoute.post("/google/signup", signup.googleSignup)

userRoute.post("/check/userExists", signup.checkUserExists)
userRoute.post("/signin", signIn.signin)
userRoute.post("/google/signin", signIn.googleSignin)


userRoute.post("/otp", userNotificationController.sendOtp)
userRoute.post("/otp/verify", userNotificationController.verifySMS)

userRoute.post("/resetPasswordLink", userNotificationController.resetPasswordLink)
userRoute.post("/resetpassword", userNotificationController.resetpassword)




export default userRoute