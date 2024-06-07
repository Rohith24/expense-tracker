import { redirect } from "react-router-dom";
import { deleteItem } from "../Service/helpers";
import { toast } from "react-toastify";
import { SaveTransaction } from "../Service/TransactionService";

export async function addTransactionAction(formData) {
    console.log(formData);
    try {
        formData.createdBy = "Rohith";
        formData.dateCreated = new Date().toISOString(); // Use ISO string for dateCreated
        const response = await saveTransaction({ Transaction: formData, user: "hello" });
        return response;
    } catch (e) {
        toast.error('Transaction failed');
        return null; // Return null in case of error
    }
}

async function saveTransaction(data) {
    try {
        const resp = await SaveTransaction(data);
        console.log(resp);
        if (resp.code === "0") {
            toast.success(`Transaction added. ${resp.message}`);
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
