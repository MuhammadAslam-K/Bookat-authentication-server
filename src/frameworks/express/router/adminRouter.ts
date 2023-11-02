import Express from "express";
import adminAuthController from "../../../adapters/controllers/admin/adminAuthController";
import adminUserManagementController from "../../../adapters/controllers/admin/adminUserManagementController";
import adminDriverManagementController from "../../../adapters/controllers/admin/adminDriverManagementController";
import adminDashboardController from "../../../adapters/controllers/admin/adminDashboardController";
import AdminCabController from "../../../adapters/controllers/admin/adminCabController";

const admin_router = Express.Router()

admin_router.post("/login", adminAuthController.signIn)

// ADMIN DASHBOARD
admin_router.get("/dashboard", adminDashboardController.dashboard)


// USER
admin_router.get("/getuser", adminUserManagementController.getuser)

admin_router.patch("/block/user", adminUserManagementController.blockUser)
admin_router.patch("/history/user", adminUserManagementController.getUserRideHistory)


// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController.getDrivers)
admin_router.get("/getdriver", adminDriverManagementController.getDriverWithId)

admin_router.patch("/block/driver", adminDriverManagementController.blockDriver)
admin_router.patch("/history/driver", adminDriverManagementController.getDriverRideHistory)

admin_router.post("/reject/driver", adminDriverManagementController.rejectDriverInfo)
admin_router.post("/approve/driver", adminDriverManagementController.approveDriver)

admin_router.post("/reject/vehicle", adminDriverManagementController.rejectVehicleInfo)
admin_router.post("/approve/vehicle", adminDriverManagementController.approveVehicle)


// CAB
admin_router.get("/cabs", AdminCabController.showCabs)
admin_router.post("/cabs/add", AdminCabController.addNewCab)
admin_router.get("/cabs/getById/:id", AdminCabController.getCab)



export default admin_router