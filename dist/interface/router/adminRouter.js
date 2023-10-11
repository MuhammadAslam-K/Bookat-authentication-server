"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../controllers/admin/adminAuthController"));
const adminUserManagementController_1 = __importDefault(require("../controllers/admin/adminUserManagementController"));
const adminDriverManagementController_1 = __importDefault(require("../controllers/admin/adminDriverManagementController"));
const admin_router = express_1.default.Router();
admin_router.post("/login", adminAuthController_1.default.signIn);
// USER
admin_router.get("/getuser", adminUserManagementController_1.default.getuser);
admin_router.post("/block/user", adminUserManagementController_1.default.blockUser);
// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController_1.default.getDrivers);
admin_router.post("/getdriver", adminDriverManagementController_1.default.getSingleDriver);
admin_router.post("/block/driver", adminDriverManagementController_1.default.blockDriver);
admin_router.post("/reject/driver", adminDriverManagementController_1.default.rejectDriver);
admin_router.post("/approve/driver", adminDriverManagementController_1.default.approveDriver);
admin_router.post("/reject/vehicle", adminDriverManagementController_1.default.rejectVehicle);
admin_router.post("/approve/vehicle", adminDriverManagementController_1.default.approveVehicle);
exports.default = admin_router;
