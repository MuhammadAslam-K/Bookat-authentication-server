"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverAuthController_1 = __importDefault(require("../controllers/driver/driverAuthController"));
const jwtTokenAuth_1 = __importDefault(require("../../middlewares/jwtTokenAuth"));
const driverNotificationController_1 = __importDefault(require("../controllers/driver/driverNotificationController"));
const driver_router = express_1.default.Router();
driver_router.post("/signup", driverAuthController_1.default.signup);
driver_router.post("/login", driverAuthController_1.default.login);
driver_router.post("/check/driverExists", driverAuthController_1.default.checkExists);
driver_router.post("/info/personal", jwtTokenAuth_1.default.decodeToken, driverAuthController_1.default.saveDriverInfo);
driver_router.post("/info/vehicle", jwtTokenAuth_1.default.decodeToken, driverAuthController_1.default.saveVehicleInfo);
driver_router.post("/resetPasswordLink", driverNotificationController_1.default.resetPasswordLink);
driver_router.post("/resetpassword", driverNotificationController_1.default.resetpassword);
exports.default = driver_router;
