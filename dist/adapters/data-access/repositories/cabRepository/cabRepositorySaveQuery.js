"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cab_model_1 = __importDefault(require("../../models/cab-model"));
const errorHandling_1 = require("../../../../business/errors/errorHandling");
exports.default = {
    addNewCab: async (data) => {
        try {
            console.log("repo data", data);
            const newCab = new cab_model_1.default({
                ...data,
                price: data.pricePerKm,
                image: data.result,
            });
            return await newCab.save();
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }
};
