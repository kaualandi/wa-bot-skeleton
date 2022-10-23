import { AxiosError, AxiosResponse } from "axios";

require('dotenv').config();
const axios = require("axios");
const FormData = require('form-data');

const baseUrlBotInfors = process.env.BASEURL_BOTINFORS;
const baseUrlApi = process.env.BASEURL_API;

function handleError(error: AxiosError) {
    console.log("ERROR 	===>", error);
    return {
        error: true,
        message: {
            code: error.response?.status || error,
            text: error.response?.statusText || ''
        }
    }
}

async function setNextStep(step: string, id: string) {
    return axios.patch(`${baseUrlBotInfors}/users/${id}`, { step: step }).then((res: AxiosResponse) => {
        console.log(`data saved: step -> ${step}`);
        return true;
    }).catch((err: AxiosError) => {
        return handleError(err);
    });
}

async function submitNewUser(id: string, name: string) {
    const now = new Date();
    const user = {
        id: id,
        name: name,
        step: 's0',
        lastMessage: now.getTime(),
        submitedName: null,
        selectedCity: null,
        selectedDistrict: null
    }
    return axios.post(`${baseUrlBotInfors}/users`, user).then((res: AxiosResponse) => {
        console.log(`new user: id -> ${id}`);
        return true;
    }).catch((err: AxiosError) => {
        return handleError(err);
    });
}

async function setLastMessage(lastMessage: number, id: string) {
    return axios.patch(`${baseUrlBotInfors}/users/${id}`, { lastMessage: lastMessage }).then((res: AxiosResponse) => {
        console.log(`data saved: lastMessage -> ${lastMessage}`);
        return true;
    }).catch((err: AxiosError) => {
        return handleError(err);
    });
}

async function getUser(id: string) {
    return axios.get(`${baseUrlBotInfors}/users/${id}`).then((res: AxiosResponse) => {
        return res.data;
    }).catch((err: AxiosError) => {
        if (err.response?.status === 404) {
            return false;
        } else {
            return handleError(err);
        }
    });
}

async function dropUser(id: string) {
    return axios.delete(`${baseUrlBotInfors}/users/${id}`).then((res: AxiosResponse) => {
        return true;
    }).catch((err: AxiosError) => {
        return handleError(err);
    });
}

export {setNextStep, submitNewUser, setLastMessage, getUser, dropUser};