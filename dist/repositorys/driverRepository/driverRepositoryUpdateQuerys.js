"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const driverEntites_1 = __importDefault(require("../../entites/driverEntites"));
exports.default = {
    addAmountInWallet: (details, driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findByIdAndUpdate(driverId, {
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
    }),
    updateDriverInfo: (data, driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    'license.licenseId': data.drivingLicenseId,
                    'license.licenseImage': data.licenseImageUrl,
                    'driverImageUrl': data.driverImageUrl,
                    'aadhar.aadharId': data.aadharId,
                    'aadhar.aadharImage': data.aadharImageUrl,
                    'driver.driverDocuments': true
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updateVehicleInfo: (data, driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield driverEntites_1.default.findByIdAndUpdate(driverId, {
                $set: {
                    'vehicle.registration.registrationId': data.registrationNo,
                    'vehicle.registration.registrationImage': data.rcImageUrl,
                    'vehicle.vehicleModel': data.vehicleModel,
                    'vehicle.maxPersons': data.maxPersons,
                    'vehicle.vehicleType': data.vehicleType,
                    'vehicle.vehicleImage1': data.vehicleImageUrl1,
                    'vehicle.vehicleImage2': data.vehicleImageUrl2,
                    'vehicle.vehicleDocuments': true
                }
            }, { new: true });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updatePassword: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield driverEntites_1.default.findOneAndUpdate({ email }, { password }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
