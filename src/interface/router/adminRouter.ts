import Express from "express";
import adminAuthController from "../controllers/admin/adminAuthController";
import adminUserManagementController from "../controllers/admin/adminUserManagementController";
import adminDriverManagementController from "../controllers/admin/adminDriverManagementController";
import adminDashboardController from "../controllers/admin/adminDashboardController";

const admin_router = Express.Router()

admin_router.post("/login", adminAuthController.signIn)

// USER
admin_router.get("/getuser", adminUserManagementController.getuser)
admin_router.patch("/block/user", adminUserManagementController.blockUser)

// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController.getDrivers)
admin_router.post("/getdriver", adminDriverManagementController.getSingleDriver)
admin_router.patch("/block/driver", adminDriverManagementController.blockDriver)

admin_router.patch("/reject/driver", adminDriverManagementController.rejectDriver)
admin_router.patch("/approve/driver", adminDriverManagementController.approveDriver)

admin_router.patch("/reject/vehicle", adminDriverManagementController.rejectVehicle)
admin_router.patch("/approve/vehicle", adminDriverManagementController.approveVehicle)

// DASHBOARD
admin_router.get("/dashboard", adminDashboardController.dashboard)

// HISTORY
admin_router.post("/history/user", adminUserManagementController.getUserRideHistory)
admin_router.post("/history/driver", adminDriverManagementController.getDriverRideHistory)


export default admin_router