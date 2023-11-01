import mongoose, { Document, Schema } from "mongoose";


const scheduleRideSchema: Schema = new Schema({

    driver_id: {
        type: String,
    },
    driverAccepted: {
        type: String,
        default: "Pending",
    },
    user_id: {
        type: String,
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

const ScheduleRideSchema = mongoose.model("scheduleRide", scheduleRideSchema)

export default ScheduleRideSchema