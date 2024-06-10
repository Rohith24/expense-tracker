import { toast } from "react-toastify";
import { SaveBudget } from "../Service/BudgetService";

export async function addBudgetAction(formData) {
    console.log(formData);
    try {
        formData.createdBy = "Rohith";
        formData.dateCreated = new Date().toISOString(); // Use ISO string for dateCreated
        const response = await addBudget({ budget: formData, user: "hello" });
        return response;
    } catch (e) {
        toast.error('Budget failed');
        return null; // Return null in case of error
    }
}

async function addBudget(data) {
    try {
        const resp = await SaveBudget(data);
        console.log(resp);
        if (resp.code === "0") {
            toast.success(resp.message);
            return resp; 
        } else {
            toast.error(`Budget failed: ${resp.message}`);
            return resp; 
        }
    } catch (error) {
        toast.error(`Budget failed: ${error.message}`);
        throw error; // Ensure the error is thrown for the caller to handle
    }
}
