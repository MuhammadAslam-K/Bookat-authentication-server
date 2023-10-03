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
    verified: {
        type: Boolean
    },
    joiningAt: {
        type: String,
        deafult: Date.now(),
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
})

const DriverSchema = mongoose.model("driver", driverSchema)

export default DriverSchema