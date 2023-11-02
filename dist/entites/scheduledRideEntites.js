"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const scheduleRideSchema = new mongoose_1.Schema({
    driver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "driver",
    },
    driverAccepted: {
        type: String,
        default: "Pending",
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user"
    },
    vehicleType: {
        type: String,
    },
    duration: {
        type: String,
    },
    pickupCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    dropoffCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    driverCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    pickupLocation: {
        type: String,
    },
    dropoffLocation: {
        type: String,
    },
    distance: {
        type: String,
    },
    price: {
        type: Number,
    },
    adminRevenu: {
        type: Number
    },
    driverRevenu: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    },
    pickUpDate: {
        type: Date,
    },
    otpVerifyed: {
        type: Boolean,
        default: false,
    },
    favourite: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Pending"
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number
    }
});
const ScheduleRideSchema = mongoose_1.default.model("scheduleRide", scheduleRideSchema);
exports.default = ScheduleRideSchema;
