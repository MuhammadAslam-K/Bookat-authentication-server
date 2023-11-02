"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driver_model_1 = __importDefault(require("../../models/driver-model"));
exports.default = {
    addAmountInWallet: async (details, driverId) => {
        try {
            return await driver_model_1.default.findByIdAndUpdate(driverId, {
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
            return await driver_model_1.default.findByIdAndUpdate(driverId, {
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
            return await driver_model_1.default.findByIdAndUpdate(driverId, {
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
            console.log(error);
            throw new Error(error.message);
        }
    },
    updatePassword: async (email, password) => {
        try {
            await driver_model_1.default.findOneAndUpdate({ email }, { password }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    changeDriverAvailablety: async (driverId) => {
        try {
            const driver = await driver_model_1.default.findById(driverId);
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
            console.log(data);
            await driver_model_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    driverImageUrl: data.driverImageUrl,
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
    updateTotalRideAndRevenu: async (driverId, driverAmount, rideId) => {
        try {
            return await driver_model_1.default.findByIdAndUpdate(driverId, {
                $inc: {
                    'RideDetails.completedRides': 1,
                    'revenue': driverAmount,
                },
                $pull: {
                    scheduledRides: {
                        rideId: rideId,
                    },
                },
                isRiding: false,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    changeTheRideStatus: async (driverId) => {
        try {
            const driver = await driver_model_1.default.findById(driverId);
            if (driver) {
                const status = driver.isRiding;
                driver.isRiding = !status;
                await driver.save();
            }
            return driver;
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    addScheduledRide: async (rideId, newRidePickupDate, duration, driverId) => {
        try {
            const newScheduledRide = {
                rideId: rideId,
                startingTime: newRidePickupDate,
                duration: duration,
            };
            await driver_model_1.default.findByIdAndUpdate(driverId, {
                $push: { scheduledRides: newScheduledRide },
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
    popUpTheScheduledRide: async (driverId, rideId) => {
        try {
            const filter = { _id: driverId };
            const update = {
                $pull: {
                    scheduledRides: {
                        rideId: rideId
                    }
                }
            };
            await driver_model_1.default.updateOne(filter, update);
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
