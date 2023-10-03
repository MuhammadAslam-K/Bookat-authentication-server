"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("../controllers/driver/register"));
const driver_router = express_1.default.Router();
driver_router.post("/signup", register_1.default.signup);
exports.default = driver_router;
