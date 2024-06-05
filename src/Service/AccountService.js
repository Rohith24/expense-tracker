import axios from "axios";
import { API_URL, getHeaders } from './BaseService'

export async function getAccount(id) {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/accounts/${id}`, { headers }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function SaveAccount(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.post(`${API_URL}/accounts`, formData, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}

export async function DeleteAccount(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.delete(`${API_URL}/accounts/${formData.id}`, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}