"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error) => {
    throw new Error(error.message);
};
exports.handleError = handleError;
