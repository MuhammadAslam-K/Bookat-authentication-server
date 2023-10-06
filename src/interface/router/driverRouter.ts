import Express from "express";
import driverAuthController from "../controllers/driver/driverAuthController";
import jwtTokenAuth from "../../middlewares/jwtTokenAuth";
import driverNotificationController from "../controllers/driver/driverNotificationController";

const driver_router = Express.Router()


driver_router.post("/signup", driverAuthController.signup)
driver_router.post("/login", driverAuthController.login)
driver_router.post("/check/driverExists", driverAuthController.checkExists)

driver_router.post("/info/personal", jwtTokenAuth.decodeToken, driverAuthController.saveDriverInfo)
driver_router.post("/info/vehicle", jwtTokenAuth.decodeToken, driverAuthController.saveVehicleInfo)

driver_router.post("/resetPasswordLink", driverNotificationController.resetPasswordLink)
driver_router.post("/resetpassword", driverNotificationController.resetpassword)


export default driver_router