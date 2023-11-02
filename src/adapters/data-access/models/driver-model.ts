import mongoose, { Schema } from "mongoose";

const driverSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refrel: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        default: 0
    },

    RideDetails: {
        completedRides: {
            default: 0,
            type: Number,
        },
        cancelledRides: {
            default: 0,
            type: Number,
        },
    },
    scheduledRides: [
        {
            rideId: String,
            startingTime: Date,
            duration: String,
        },
    ],

    joinedAt: {
        type: Date,
        default: Date.now(),
    },

    block: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    isRiding: {
        type: Boolean,
        default: false
    },

    driver: {
        driverVerified: {
            type: Boolean,
            default: false,
        },
        driverDocuments: {
            type: Boolean,
            default: false,
        },
    },

    vehicle: {
        vehicleVerified: {
            type: Boolean,
            default: false
        },
        vehicleDocuments: {
            type: Boolean,
            default: false
        },
    },

    wallet: {
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                date: {
                    type: Date,
                },
                details: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                status: {
                    type: String,
                },
            },
        ],
    },

    driverImageUrl: {
        type: String,
    },

    aadhar: {
        aadharId: {
            type: String,
        },
        aadharImage: {
            type: String,
        },
    },

    license: {
        licenseId: {
            type: String,
        },
        licenseImage: {
            type: String,
        },
    },

    vehicleDocuments: {

        registration: {
            registrationId: {
                type: String,
            },
            registrationImage: {
                type: String,
            },
        },
        vehicleModel: { type: String },
        maxPersons: { type: String },
        vehicleType: { type: String },
        vehicleImage1: { type: String },
        vehicleImage2: { type: String }
    }
})

const DriverSchema = mongoose.model("driver", driverSchema)

export default DriverSchema
