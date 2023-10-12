import Express from "express";
import driverAuthController from "../controllers/driver/driverAuthController";
import jwtTokenAuth from "../../middlewares/jwtTokenAuth";
import driverNotificationController from "../controllers/driver/driverNotificationController";
import driverProfileController from "../controllers/driver/driverProfileController";
import driverVehicleController from "../controllers/driver/driverVehicleController";

const driver_router = Express.Router()


driver_router.post("/signup", driverAuthController.signup)
driver_router.post("/login", driverAuthController.login)
driver_router.post("/check/driverExists", driverAuthController.checkExists)

driver_router.post("/info/personal", jwtTokenAuth.validateToken, driverAuthController.saveDriverInfo)
driver_router.post("/info/vehicle", jwtTokenAuth.validateToken, driverAuthController.saveVehicleInfo)

driver_router.post("/resetPasswordLink", driverNotificationController.resetPasswordLink)
driver_router.post("/resetpassword", driverNotificationController.resetpassword)

// Driver Profile
driver_router.get("/Profile", jwtTokenAuth.validateToken, driverProfileController.getDriverProfile)
driver_router.post("/update/profile", jwtTokenAuth.validateToken, driverProfileController.updateDriverProfile)
driver_router.post("/available", jwtTokenAuth.validateToken, driverProfileController.driverAvailable)

// Driver Vehicle
driver_router.get("/vehicle", jwtTokenAuth.validateToken, driverVehicleController.getVehicleInfo)
driver_router.post("/update/vehicle", jwtTokenAuth.validateToken, driverVehicleController.updateVehicleInfo)



export default driver_router