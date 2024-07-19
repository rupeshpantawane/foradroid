import axios from "axios";
import config from "../config";

export const AuthAPI = {
    login: async (data) => {
        return await axios.post(`${config.API_URL}/api/admin/login`, data);
    },
    forgotPassword: async (data) => {
        return await axios.post(`${config.API_URL}/api/admin/forgot-password`, data);
    },
    resetPassword: async (data) => {
        return await axios.post(`${config.API_URL}/api/admin/reset-password`, data);
    }
}