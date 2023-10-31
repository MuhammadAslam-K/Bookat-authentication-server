"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../controllers/admin/adminAuthController"));
const adminUserManagementController_1 = __importDefault(require("../controllers/admin/adminUserManagementController"));
const adminDriverManagementController_1 = __importDefault(require("../controllers/admin/adminDriverManagementController"));
const adminDashboardController_1 = __importDefault(require("../controllers/admin/adminDashboardController"));
const admin_router = express_1.default.Router();
admin_router.post("/login", adminAuthController_1.default.signIn);
// USER
admin_router.get("/getuser", adminUserManagementController_1.default.getuser);
admin_router.patch("/block/user", adminUserManagementController_1.default.blockUser);
// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController_1.default.getDrivers);
admin_router.post("/getdriver", adminDriverManagementController_1.default.getSingleDriver);
admin_router.patch("/block/driver", adminDriverManagementController_1.default.blockDriver);
admin_router.patch("/reject/driver", adminDriverManagementController_1.default.rejectDriver);
admin_router.patch("/approve/driver", adminDriverManagementController_1.default.approveDriver);
admin_router.patch("/reject/vehicle", adminDriverManagementController_1.default.rejectVehicle);
admin_router.patch("/approve/vehicle", adminDriverManagementController_1.default.approveVehicle);
// DASHBOARD
admin_router.get("/dashboard", adminDashboardController_1.default.dashboard);
// HISTORY
admin_router.post("/history/user", adminUserManagementController_1.default.getUserRideHistory);
admin_router.post("/history/driver", adminDriverManagementController_1.default.getDriverRideHistory);
exports.default = admin_router;
