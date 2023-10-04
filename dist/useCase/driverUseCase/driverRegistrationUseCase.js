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
const driverRepositoryGetQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryGetQuerys"));
const driverRepositoryUpdateQuerys_1 = __importDefault(require("../../repositorys/driverRepository/driverRepositoryUpdateQuerys"));
exports.default = {
    saveDriverInfo: (data, driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const aadharidExists = yield driverRepositoryGetQuerys_1.default.findDriverWithAadharId(data.aadharId);
            if (!aadharidExists) {
                const drivingLicenseIdExists = yield driverRepositoryGetQuerys_1.default.findDriverWithDrivingLicenseId(data.drivingLicenseId);
                if (!drivingLicenseIdExists) {
                    return yield driverRepositoryUpdateQuerys_1.default.updateDriverInfo(data, driverId);
                }
                else {
                    throw new Error("License Id already Exists please Re-check !!");
                }
            }
            else {
                throw new Error("Aadhar Id already Exists please Re-check !!");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    saveVehicleInfo: (data, driverId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rcExists = yield driverRepositoryGetQuerys_1.default.findVehicleWithRcNo(data.registrationNo);
            if (!rcExists) {
                return yield driverRepositoryUpdateQuerys_1.default.updateVehicleInfo(data, driverId);
            }
            else {
                throw new Error("Registration No already Exists please Re-check !!");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
// {
//     [1]   registrationNo: 'NY 45 C 1234',
//     [1]   vehicleModel: 'innova',
//     [1]   maxPersons: '7',
//     [1]   vehicleType: '',
//     [1]   rcImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2Frc%2Fimage-170-1024x683.png?alt=media&token=d8f5ac0b-4419-4a1f-b963-bf37d642b90b',
//     [1]   vehicle1ImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2FvehicleImage1%2Fwork-1.png?alt=media&token=94fc878b-ce37-4938-b9da-d5d416e76476',
//     [1]   vehicle2ImageUrl: 'https://firebasestorage.googleapis.com/v0/b/bookat-87c98.appspot.com/o/images%2Fvehicle%2FvehicleImage2%2Fimage-170-1024x683.png?alt=media&token=e4f57f5a-2798-4b60-a60b-954624b1cf09'
//     [1] }
