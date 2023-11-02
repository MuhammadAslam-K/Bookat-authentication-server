"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect(mongoURL) {
    try {
        await mongoose_1.default.connect(mongoURL);
        console.log("DB Connected Successfully");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        console.log("Cannot connect");
    }
}
exports.default = connect;
