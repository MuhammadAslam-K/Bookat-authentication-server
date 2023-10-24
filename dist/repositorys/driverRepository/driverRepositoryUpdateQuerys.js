"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
exports.default = {
    addAmountInWallet: async (details, driverId) => {
        try {
            return await driverEntites_1.default.findByIdAndUpdate(driverId, {
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
    updateDriverInfo: async (data, driverId) => {
        try {
            return await driverEntites_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    'license.licenseId': data.drivingLicenseId,
                    'license.licenseImage': data.licenseImageUrl,
                    'driverImageUrl': data.driverImageUrl,
                    'aadhar.aadharId': data.aadharId,
                    'aadhar.aadharImage': data.aadharImageUrl,
                    'driver.driverDocuments': true,
                    'driver.driverVerified': false,
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateVehicleInfo: async (data, driverId) => {
        try {
            console.log("data", data);
            console.log("id:", driverId);
            return await driverEntites_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    'vehicleDocuments.registration.registrationId': data.registrationId,
                    'vehicleDocuments.registration.registrationImage': data.rcImageUrl,
                    'vehicleDocuments.vehicleModel': data.vehicleModel,
                    'vehicleDocuments.maxPersons': data.maxPersons,
                    'vehicleDocuments.vehicleType': data.vehicleType,
                    'vehicleDocuments.vehicleImage1': data.vehicleImageUrl1,
                    'vehicleDocuments.vehicleImage2': data.vehicleImageUrl2,
                    'vehicle.vehicleDocuments': true,
                    'vehicle.vehicleVerified': false,
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updatePassword: async (email, password) => {
        try {
            await driverEntites_1.default.findOneAndUpdate({ email }, { password }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    changeDriverAvailablety: async (driverId) => {
        try {
            const driver = await driverEntites_1.default.findById(driverId);
            if (driver) {
                driver.isAvailable = !driver.isAvailable;
                const result = await driver.save();
                return result.isAvailable;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateDriverProfile: async (data, driverId) => {
        try {
            await driverEntites_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    ...data,
                    'aadhar.aadharId': data.aadharId,
                    'aadhar.aadharImage': data.aadharImageUrl,
                    'license.licenseId': data.licenseId,
                    'license.licenseImage': data.licenseImageUrl,
                    'driver.driverDocuments': false,
                    'driver.driverVerified': false,
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    updateTotalRide: async (driverId) => {
        try {
            const driver = await driverEntites_1.default.findById(driverId);
            if (driver) {
                const count = driver.RideDetails.completedRides;
                driver.RideDetails.completedRides = count + 1;
                driver.isRiding = !driver.isRiding;
                return await driver.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    changeTheRideStatus: async (driverId) => {
        try {
            const driver = await driverEntites_1.default.findById(driverId);
            if (driver) {
                driver.isRiding = !driver.isRiding;
                await driver.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
