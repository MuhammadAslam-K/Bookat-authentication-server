"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../adapters/controllers/admin/adminAuthController"));
const adminUserManagementController_1 = __importDefault(require("../../../adapters/controllers/admin/adminUserManagementController"));
const adminDriverManagementController_1 = __importDefault(require("../../../adapters/controllers/admin/adminDriverManagementController"));
const adminDashboardController_1 = __importDefault(require("../../../adapters/controllers/admin/adminDashboardController"));
const adminCabController_1 = __importDefault(require("../../../adapters/controllers/admin/adminCabController"));
const admin_router = express_1.default.Router();
admin_router.post("/login", adminAuthController_1.default.signIn);
// ADMIN DASHBOARD
admin_router.get("/dashboard", adminDashboardController_1.default.dashboard);
// USER
admin_router.get("/getuser", adminUserManagementController_1.default.getuser);
admin_router.patch("/block/user", adminUserManagementController_1.default.blockUser);
admin_router.patch("/history/user", adminUserManagementController_1.default.getUserRideHistory);
// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController_1.default.getDrivers);
admin_router.get("/getdriver", adminDriverManagementController_1.default.getDriverWithId);
admin_router.patch("/block/driver", adminDriverManagementController_1.default.blockDriver);
admin_router.patch("/history/driver", adminDriverManagementController_1.default.getDriverRideHistory);
admin_router.post("/reject/driver", adminDriverManagementController_1.default.rejectDriverInfo);
admin_router.post("/approve/driver", adminDriverManagementController_1.default.approveDriver);
admin_router.post("/reject/vehicle", adminDriverManagementController_1.default.rejectVehicleInfo);
admin_router.post("/approve/vehicle", adminDriverManagementController_1.default.approveVehicle);
// CAB
admin_router.get("/cabs", adminCabController_1.default.showCabs);
admin_router.post("/cabs/add", adminCabController_1.default.addNewCab);
admin_router.get("/cabs/getById/:id", adminCabController_1.default.getCab);
exports.default = admin_router;
