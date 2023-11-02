import Express from "express";
import driverAuthController from "../../../adapters/controllers/driver/driverAuthController";
import jwtTokenAuth from "../middlewares/jwtTokenAuth";
import driverNotificationController from "../../../adapters/controllers/driver/driverNotificationController";
import driverProfileController from "../../../adapters/controllers/driver/driverProfileController";
import driverVehicleController from "../../../adapters/controllers/driver/driverVehicleController";
import driverRideController from "../../../adapters/controllers/driver/driverRideController";
import driverScheduledRideController from "../../../adapters/controllers/driver/driverScheduledRideController";
import driverDashboardController from "../../../adapters/controllers/driver/driverDashboardController";

const driver_router = Express.Router()

// AUTH
driver_router.post("/signup", driverAuthController.signup)
driver_router.post("/login", driverAuthController.login)
driver_router.post("/check/driverExists", driverAuthController.checkExists)

driver_router.post("/info/personal", jwtTokenAuth.validateToken, driverAuthController.saveDriverInfo)
driver_router.post("/info/vehicle", jwtTokenAuth.validateToken, driverAuthController.saveVehicleInfo)

driver_router.post("/resetPasswordLink", driverNotificationController.resetPasswordLink)
driver_router.post("/resetpassword", driverNotificationController.resetpassword)

// Profile
driver_router.get("/Profile", driverProfileController.getDriverProfile)
driver_router.post("/update/profile", driverProfileController.updateDriverProfile)
driver_router.patch("/available", driverProfileController.driverAvailable)

// Driver Vehicle
driver_router.get("/vehicle", driverVehicleController.getVehicleInfo)
driver_router.post("/update/vehicle", driverVehicleController.updateVehicleInfo)

// Ride
driver_router.patch("/getUser", driverRideController.getUserWithId)

driver_router.get("/currentRide", driverRideController.currentRide)

driver_router.get("/scheduleRidePending", driverScheduledRideController.schedulePendingRides)
driver_router.get("/scheduleRideNotification", driverScheduledRideController.getScheduleRideNotification)
driver_router.post("/scheduleRideConfirmation", driverScheduledRideController.confirmScheduledRide)

driver_router.patch("/startScheduledRide", driverScheduledRideController.startScheduledRide)

driver_router.post("/rideOtpVerify", driverNotificationController.verifyOTP)

// DASHBOARD
driver_router.get("/dashboard", driverDashboardController.dashboard)

// HISTORY
driver_router.get("/history", driverRideController.getRideHistory)

// CAB
driver_router.get("/getCabs", driverDashboardController.getAllCabs)

export default driver_router