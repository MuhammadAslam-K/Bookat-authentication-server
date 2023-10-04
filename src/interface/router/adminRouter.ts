import Express from "express";
import adminAuthController from "../controllers/admin/adminAuthController";

const admin_router = Express.Router()

admin_router.post("/login", adminAuthController.signIn)


export default admin_router