"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../controllers/admin/adminAuthController"));
const admin_router = express_1.default.Router();
admin_router.post("/login", adminAuthController_1.default.signIn);
exports.default = admin_router;
