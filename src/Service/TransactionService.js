import axios from "axios";
import { API_URL, getHeaders } from './BaseService'

export async function getTransaction(id) {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/transaction/get/${id}`, { headers }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function getTransactions({accountId, budgetId}) {
    try {
        const headers = getHeaders();
        console.log(budgetId)
        let params = { budget: budgetId };
        const response = await axios(
            `${API_URL}/transaction`, { headers, params }
        );
        return response.data;
    } catch (error) {
        throw new Error("Network request failed");
    }

}

export async function getLatestTransactions(id) {
    try {
        const headers = getHeaders();
        const response = await axios(
            `${API_URL}/transaction/latest`, { headers }
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

export async function UpdateTransaction(id, formData) {
    const headers = getHeaders();
    try {
        const response = await axios.patch(`${API_URL}/transaction/${id}`, formData, { headers });
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

export async function formatTransactions(accounts, budgets, transactions){
    return transactions.map(transaction => {
        const fromAccount = accounts.find(acc => acc._id === transaction.fromAccountId);
  
        const toAccount = accounts.find(acc => acc._id === transaction.toAccountId);
        
        const budgetDetail = budgets.find(bud => bud._id === transaction.category);
        const type = transaction.type ?? (transaction.fromAccountId !== null && transaction.fromAccountId !== undefined ? transaction.toAccountId !== null && transaction.toAccountId !== undefined ? "Transfer" : "Debit" : "Credit");
  
        let accountName = fromAccount?.name !== null && fromAccount?.name !== undefined ? toAccount?.name !== null && toAccount?.name !== undefined ? `${fromAccount?.name} - ${toAccount?.name}` : fromAccount?.name : toAccount?.name;
        
        
         accountName = accountName != null ? accountName:  (transaction.fromAccountId !== null && transaction.fromAccountId !== undefined ? transaction.toAccountId !== null && transaction.toAccountId !== undefined ? `${transaction.fromAccountId} - ${transaction.toAccountId}` : transaction.fromAccountId : transaction.toAccountId);
        return {
            ...transaction,
            accountDetails : fromAccount ?? toAccount,
            fromAccount : fromAccount,
            toAccount : toAccount,
            budget: budgetDetail ? budgetDetail : null,
            type: type,
            accountName: accountName
        };
    });
}