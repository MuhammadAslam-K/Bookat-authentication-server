import Express from "express";
import driverAuthController from "../controllers/driver/driverAuthController";
import jwtTokenAuth from "../../middlewares/jwtTokenAuth";
import driverNotificationController from "../controllers/driver/driverNotificationController";
import driverProfileController from "../controllers/driver/driverProfileController";
import driverVehicleController from "../controllers/driver/driverVehicleController";
import driverRideController from "../controllers/driver/driverRideController";
import driverScheduledRideController from "../controllers/driver/driverScheduledRideController";
import driverDashboardController from "../controllers/driver/driverDashboardController";

const driver_router = Express.Router()


driver_router.post("/signup", driverAuthController.signup)
driver_router.post("/login", driverAuthController.login)
driver_router.post("/check/driverExists", driverAuthController.checkExists)

driver_router.post("/info/personal", jwtTokenAuth.validateToken, driverAuthController.saveDriverInfo)
driver_router.post("/info/vehicle", jwtTokenAuth.validateToken, driverAuthController.saveVehicleInfo)

driver_router.post("/resetPasswordLink", driverNotificationController.resetPasswordLink)
driver_router.post("/resetpassword", driverNotificationController.resetpassword)

// Driver Profile
driver_router.get("/Profile", driverProfileController.getDriverProfile)
driver_router.post("/update/profile", driverProfileController.updateDriverProfile)
driver_router.post("/available", driverProfileController.driverAvailable)

// Driver Vehicle
driver_router.get("/vehicle", driverVehicleController.getVehicleInfo)
driver_router.post("/update/vehicle", driverVehicleController.updateVehicleInfo)

// Ride
driver_router.post("/getUser", driverRideController.getUserWithId)

driver_router.get("/currentRide", driverRideController.currentRide)

driver_router.get("/scheduleRidePending", driverScheduledRideController.schedulePendingRides)
// driver_router.get("/scheduleRideHistory", driverScheduledRideController.getscheduleRideHistory)
driver_router.get("/scheduleRideNotification", driverScheduledRideController.getScheduleRideNotification)
driver_router.post("/scheduleRideConfirmation", driverScheduledRideController.confirmScheduledRide)

driver_router.patch("/startScheduledRide", driverScheduledRideController.startScheduledRide)

driver_router.post("/rideOtpVerify", driverNotificationController.verifyOTP)

// DASHBOARD
driver_router.get("/dashboard", driverDashboardController.dashboard)

// HISTORY
driver_router.get("/history", driverRideController.getRideHistory)

export default driver_router