import Express from "express";

import signup from "../controllers/user/signup"
import signIn from "../controllers/user/signIn";

const userRoute = Express.Router()

userRoute.post("/signup", signup.signup)
userRoute.post("/google/signup", signup.googleSignup)
userRoute.post("/signin", signIn.signin)
userRoute.post("/google/signup", signIn.googleSignup)



export default userRoute