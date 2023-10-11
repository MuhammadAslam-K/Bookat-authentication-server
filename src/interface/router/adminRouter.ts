import Express from "express";
import adminAuthController from "../controllers/admin/adminAuthController";
import adminUserManagementController from "../controllers/admin/adminUserManagementController";
import adminDriverManagementController from "../controllers/admin/adminDriverManagementController";

const admin_router = Express.Router()

admin_router.post("/login", adminAuthController.signIn)

// USER
admin_router.get("/getuser", adminUserManagementController.getuser)
admin_router.post("/block/user", adminUserManagementController.blockUser)

// DRIVER
admin_router.get("/getdrivers", adminDriverManagementController.getDrivers)
admin_router.post("/getdriver", adminDriverManagementController.getSingleDriver)
admin_router.post("/block/driver", adminDriverManagementController.blockDriver)

admin_router.post("/reject/driver", adminDriverManagementController.rejectDriver)
admin_router.post("/approve/driver", adminDriverManagementController.approveDriver)

admin_router.post("/reject/vehicle", adminDriverManagementController.rejectVehicle)
admin_router.post("/approve/vehicle", adminDriverManagementController.approveVehicle)


export default admin_router