import { redirect } from "react-router-dom";
import { deleteItem } from "../Service/helpers";
import { toast } from "react-toastify";

export async function logoutAction(){
    deleteItem("userName")
    toast.success("Logged out successfully.")
    return redirect("/")
}