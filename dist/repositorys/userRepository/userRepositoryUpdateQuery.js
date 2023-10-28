"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userEntites_1 = __importDefault(require("../../entites/userEntites"));
exports.default = {
    addAmountInWallet: async (details, userId) => {
        try {
            return await userEntites_1.default.findByIdAndUpdate(userId, {
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
            await userEntites_1.default.findOneAndUpdate({ email }, { password }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateUserProfile: async (data, userId) => {
        try {
            return await userEntites_1.default.findByIdAndUpdate(userId, {
                $set: {
                    ...data,
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateTotalRide: async (userId) => {
        try {
            const result = await userEntites_1.default.findByIdAndUpdate(userId, { $inc: { 'RideDetails.completedRides': 1 } });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateCancelledRides: async (userId) => {
        try {
            const result = await userEntites_1.default.findByIdAndUpdate(userId, { $inc: { 'RideDetails.cancelledRides': 1 } });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
