import mongoose, { Document, Schema } from "mongoose";


const rideSchema: Schema = new Schema({

    driver_id: {
        type: String,
    },
    user_id: {
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
    pickupLocation: {
        type: String,
    },
    dropoffLocation: {
        type: String,
    },
    driverCoordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    distance: {
        type: String,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    paymentMode: {
        type: String,
    },
    otpVerifyed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "Started"
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number
    }

});

const RideSchema = mongoose.model("ride", rideSchema)

export default RideSchema