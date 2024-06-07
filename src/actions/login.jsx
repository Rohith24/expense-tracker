import { redirect } from "react-router-dom";
import { deleteItem } from "../Service/helpers";
import { toast } from "react-toastify";

export async function loginAction(formData){
    try{
        localStorage.setItem("userName", JSON.stringify(formData.email));
        return toast.success(`Welcome ${formData.email}`);
    }
    catch (e){
        throw new Error("Unable to sign In");
    }
}