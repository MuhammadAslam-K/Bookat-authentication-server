"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = require("../../errors/errorHandling");
const cabRepositorySaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabRepositorySaveQuery"));
const cabrepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = {
    listAllTheCabs: async () => {
        try {
            return cabrepositoryGetQuery_1.default.getAllTheCabs();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    addNewCab: async (data) => {
        try {
            const cabTypeLower = data.cabType.toLowerCase();
            data.cabType = cabTypeLower;
            const checkCabExists = await cabrepositoryGetQuery_1.default.chekCabExistsWithCabName(data.cabType);
            if (checkCabExists) {
                throw new Error("The Cab Type Already Exists");
            }
            else {
                console.log("usecase :", data);
                return await cabRepositorySaveQuery_1.default.addNewCab(data);
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    },
    getTheCabWithId: async (id) => {
        try {
            const carId = new mongoose_1.default.Types.ObjectId(id);
            return await cabrepositoryGetQuery_1.default.getCabWithId(carId);
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
