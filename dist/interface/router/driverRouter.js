"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverAuthController_1 = __importDefault(require("../controllers/driver/driverAuthController"));
const jwtTokenAuth_1 = __importDefault(require("../../middlewares/jwtTokenAuth"));
const driverNotificationController_1 = __importDefault(require("../controllers/driver/driverNotificationController"));
const driverProfileController_1 = __importDefault(require("../controllers/driver/driverProfileController"));
const driverVehicleController_1 = __importDefault(require("../controllers/driver/driverVehicleController"));
const driverRideController_1 = __importDefault(require("../controllers/driver/driverRideController"));
const driverScheduledRideController_1 = __importDefault(require("../controllers/driver/driverScheduledRideController"));
const driver_router = express_1.default.Router();
driver_router.post("/signup", driverAuthController_1.default.signup);
driver_router.post("/login", driverAuthController_1.default.login);
driver_router.post("/check/driverExists", driverAuthController_1.default.checkExists);
driver_router.post("/info/personal", jwtTokenAuth_1.default.validateToken, driverAuthController_1.default.saveDriverInfo);
driver_router.post("/info/vehicle", jwtTokenAuth_1.default.validateToken, driverAuthController_1.default.saveVehicleInfo);
driver_router.post("/resetPasswordLink", driverNotificationController_1.default.resetPasswordLink);
driver_router.post("/resetpassword", driverNotificationController_1.default.resetpassword);
// Driver Profile
driver_router.get("/Profile", driverProfileController_1.default.getDriverProfile);
driver_router.post("/update/profile", driverProfileController_1.default.updateDriverProfile);
driver_router.post("/available", driverProfileController_1.default.driverAvailable);
// Driver Vehicle
driver_router.get("/vehicle", driverVehicleController_1.default.getVehicleInfo);
driver_router.post("/update/vehicle", driverVehicleController_1.default.updateVehicleInfo);
// Ride
driver_router.post("/getUser", driverRideController_1.default.getUserWithId);
driver_router.get("/rideHistory", driverRideController_1.default.getRideHistory);
driver_router.get("/currentRide", driverRideController_1.default.currentRide);
driver_router.get("/scheduleRideHistory", driverScheduledRideController_1.default.getscheduleRideHistory);
driver_router.get("/scheduleRideNotification", driverScheduledRideController_1.default.getScheduleRideNotification);
driver_router.post("/scheduleRideConfirmation", driverScheduledRideController_1.default.confirmScheduledRide);
driver_router.post("/rideOtpVerify", driverNotificationController_1.default.verifyOTP);
exports.default = driver_router;
