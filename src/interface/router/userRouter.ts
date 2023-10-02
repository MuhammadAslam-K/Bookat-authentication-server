import Express from "express";

import signup from "../controllers/user/signup"
const userRoute = Express.Router()

userRoute.post("/signup", signup.signup)
userRoute.post("/google/signup", signup.googleSignup)



export default userRoute