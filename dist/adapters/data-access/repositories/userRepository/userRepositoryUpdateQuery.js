"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user-model"));
exports.default = {
    addAmountInWalletWithUserId: async (details, userId) => {
        try {
            return await user_model_1.default.findByIdAndUpdate(userId, {
                $push: {
                    'wallet.transactions': details
                },
                $inc: {
                    'wallet.balance': details.amount
                },
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updatePassword: async (email, password) => {
        try {
            await user_model_1.default.findOneAndUpdate({ email }, { password }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateUserProfile: async (data, userId) => {
        try {
            return await user_model_1.default.findByIdAndUpdate(userId, {
                $set: {
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateTotalRide: async (userId) => {
        try {
            return await user_model_1.default.findByIdAndUpdate(userId, { $inc: { 'RideDetails.completedRides': 1 } });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateCancelledRides: async (userId) => {
        try {
            const result = await user_model_1.default.findByIdAndUpdate(userId, { $inc: { 'RideDetails.cancelledRides': 1 } });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
