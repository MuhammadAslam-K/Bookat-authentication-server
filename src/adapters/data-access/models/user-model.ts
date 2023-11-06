import mongoose, { Schema, Document } from "mongoose";

interface WalletTransaction {
    date: Date;
    details: string;
    amount: number;
    status: string;
}

interface Wallet {
    balance: number;
    transactions: WalletTransaction[];
}

interface RideDetails {
    completedRides: number;
    cancelledRides: number;
}

export interface IUser extends Document {
    name: string;
    mobile?: string;
    email: string;
    password?: string;
    refrel: string;
    block: boolean;
    joinedAt: Date;
    wallet: Wallet;
    RideDetails: RideDetails;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        default: null,
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
    joinedAt: {
        type: Date,
        default: Date.now(),
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
});

const UserSchema = mongoose.model<IUser>("user", userSchema);

export default UserSchema;
