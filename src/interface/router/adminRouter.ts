import Express from "express";
import adminAuthController from "../controllers/admin/adminAuthController";
import adminUserManagementController from "../controllers/admin/adminUserManagementController";
import adminDriverManagementController from "../controllers/admin/adminDriverManagementController";
import adminDashboardController from "../controllers/admin/adminDashboardController";
import AdminCabController from "../controllers/cab/AdminCabController";

const admin_router = Express.Router()

admin_router.post("/login", adminAuthController.signIn)

// USER
admin_router.get("/getuser", adminUserManagementController.getuser)
admin_router.patch("/block/user", adminUserManagementController.blockUser)

// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController.getDrivers)
admin_router.get("/getdriver", adminDriverManagementController.getSingleDriver)
admin_router.patch("/block/driver", adminDriverManagementController.blockDriver)

admin_router.post("/reject/driver", adminDriverManagementController.rejectDriver)
admin_router.post("/approve/driver", adminDriverManagementController.approveDriver)

admin_router.post("/reject/vehicle", adminDriverManagementController.rejectVehicle)
admin_router.post("/approve/vehicle", adminDriverManagementController.approveVehicle)

// DASHBOARD
admin_router.get("/dashboard", adminDashboardController.dashboard)

// HISTORYS
admin_router.post("/history/user", adminUserManagementController.getUserRideHistory)
admin_router.post("/history/driver", adminDriverManagementController.getDriverRideHistory)

// CAB
admin_router.get("/cabs", AdminCabController.showCabs)
admin_router.post("/cabs/add", AdminCabController.addNewCab)
admin_router.get("/cabs/getById/:id", AdminCabController.getcar)

export default admin_router