import Express from "express";
import driverAuthController from "../controllers/driver/driverAuthController";
import jwtTokenAuth from "../../middlewares/jwtTokenAuth";

const driver_router = Express.Router()


driver_router.post("/signup", driverAuthController.signup)
driver_router.post("/login", driverAuthController.login)

driver_router.post("/info/personal", jwtTokenAuth.decodeToken, driverAuthController.saveDriverInfo)
driver_router.post("/info/vehicle", jwtTokenAuth.decodeToken, driverAuthController.saveVehicleInfo)



export default driver_router