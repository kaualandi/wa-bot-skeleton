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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropUser = exports.getUser = exports.setLastMessage = exports.submitNewUser = exports.setNextStep = void 0;
require('dotenv').config();
const axios = require("axios");
const FormData = require('form-data');
const baseUrlBotInfors = process.env.BASEURL_BOTINFORS;
const baseUrlApi = process.env.BASEURL_API;
function handleError(error) {
    var _a, _b;
    console.log("ERROR 	===>", error);
    return {
        error: true,
        message: {
            code: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || error,
            text: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText) || ''
        }
    };
}
function setNextStep(step, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios.patch(`${baseUrlBotInfors}/users/${id}`, { step: step }).then((res) => {
            console.log(`data saved: step -> ${step}`);
            return true;
        }).catch((err) => {
            return handleError(err);
        });
    });
}
exports.setNextStep = setNextStep;
function submitNewUser(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const user = {
            id: id,
            name: name,
            step: 's0',
            lastMessage: now.getTime(),
            submitedName: null,
            selectedCity: null,
            selectedDistrict: null
        };
        return axios.post(`${baseUrlBotInfors}/users`, user).then((res) => {
            console.log(`new user: id -> ${id}`);
            return true;
        }).catch((err) => {
            return handleError(err);
        });
    });
}
exports.submitNewUser = submitNewUser;
function setLastMessage(lastMessage, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios.patch(`${baseUrlBotInfors}/users/${id}`, { lastMessage: lastMessage }).then((res) => {
            console.log(`data saved: lastMessage -> ${lastMessage}`);
            return true;
        }).catch((err) => {
            return handleError(err);
        });
    });
}
exports.setLastMessage = setLastMessage;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios.get(`${baseUrlBotInfors}/users/${id}`).then((res) => {
            return res.data;
        }).catch((err) => {
            var _a;
            if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                return false;
            }
            else {
                return handleError(err);
            }
        });
    });
}
exports.getUser = getUser;
function dropUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return axios.delete(`${baseUrlBotInfors}/users/${id}`).then((res) => {
            return true;
        }).catch((err) => {
            return handleError(err);
        });
    });
}
exports.dropUser = dropUser;
