import Express from "express";
import register from "../controllers/driver/register";

const driver_router = Express.Router()


driver_router.post("/signup", register.signup)




export default driver_router