import Express from "express";

import signup from "../controllers/user/userRegisterController"
import signIn from "../controllers/user/userSignInController";

const userRoute = Express.Router()

userRoute.post("/signup", signup.signup)
userRoute.post("/google/signup", signup.googleSignup)

userRoute.post("/signin", signIn.signin)
userRoute.post("/google/signin", signIn.googleSignin)



export default userRoute