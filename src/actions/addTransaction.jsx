import { redirect } from "react-router-dom";
import { deleteItem } from "../Service/helpers";
import { toast } from "react-toastify";
import { SaveTransaction, UpdateTransaction } from "../Service/TransactionService";

export async function addTransactionAction(formData) {
    console.log(formData);
    try {
        let response;
        if(formData._id === null || formData._id === undefined || formData._id === '') {
            delete formData._id;
            formData.createdBy = "Rohith";
            formData.dateCreated = new Date().toISOString(); // Use ISO string for dateCreated
            response = await createTransaction({ transaction: formData, user: "hello" });
        }else {
            response = await updateTransaction({ transaction: formData, user: "hello" });
        }
        return response;
    } catch (e) {
        toast.error('Transaction failed');
        return null; // Return null in case of error
    }
}

async function createTransaction(data) {
    try {
        const resp = await SaveTransaction(data);
        console.log(resp);
        if (resp.code === "0") {
            toast.success(`${resp.message}`);
            return resp; 
        } else {
            toast.error(`Transaction failed: ${resp.message}`);
            return resp; 
        }
    } catch (error) {
        toast.error(`Transaction failed: ${error.message}`);
        throw error; // Ensure the error is thrown for the caller to handle
    }
}


async function updateTransaction(data) {
    try {
        const resp = await UpdateTransaction(data.transaction._id, data);
        console.log(resp);
        if (resp.code === "0") {
            toast.success(`${resp.message}`);
            return resp; 
        } else {
            toast.error(`Transaction failed: ${resp.message}`);
            return resp; 
        }
    } catch (error) {
        toast.error(`Transaction failed: ${error.message}`);
        throw error; // Ensure the error is thrown for the caller to handle
    }
}