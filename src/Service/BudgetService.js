import axios from "axios";
import { API_URL, getHeaders } from './BaseService'

export async function getBudgets() {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/budgets`, { headers }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function getBudget(id) {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/budgets/${id}`, { headers }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function SaveBudget(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.post(`${API_URL}/budgets`, formData, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}

export async function DeleteBudget(formData) {
    const headers = getHeaders();
    try {
        const response = await axios.delete(`${API_URL}/budgets/${formData.id}`, { headers });
        return response.data;
    } catch (err) {
        throw new Error(err.message || " Network request failed");
    }

}