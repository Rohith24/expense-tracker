import axios from "axios";
import { API_URL, getHeaders } from './BaseService'

export async function getTransaction(id) {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/transaction/${id}`, { headers }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function SaveTransaction(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.post(`${API_URL}/transaction`, formData, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}

export async function DeleteTransaction(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.delete(`${API_URL}/transaction/${formData.id}`, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}