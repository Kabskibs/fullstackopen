"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getAllData = () => {
    return patients_1.default;
};
const getAllDataNoSSN = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addDataEntry = () => {
    return null;
};
exports.default = {
    getAllData,
    addDataEntry,
    getAllDataNoSSN
};
