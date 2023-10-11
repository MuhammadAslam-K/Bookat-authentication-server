import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    refrel: {
        type: String,
        required: true
    },
    block: {
        type: Boolean,
        default: false,
    },
    joiningAt: {
        type: String,
        deafult: Date.now(),
    },
    totalRides: {
        type: Number,
        default: 0
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

})

const UserSchema = mongoose.model("user", userSchema)

export default UserSchema