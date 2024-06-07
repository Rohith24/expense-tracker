import { useLoaderData } from "react-router-dom";
import { fetchData } from "../Service/helpers"
import { useState } from "react";
import AccountList from "../banking/AccountList";
import { Button } from "@material-tailwind/react";
import useFetch from "../Service/useFetch";
import Home from "../components/Home";
import AddTransaction from "../components/AddTransaction";
import { toast } from "react-toastify";
import { addTransactionAction } from "../actions/addTransaction";
import { loginAction } from "../actions/login";


export function dashBoardLoader(){
    const userName = fetchData("userName");
    return { userName }
}

export async function DashboardAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    if(formData._actionType === 'login'){
        return await loginAction(formData);
    }else if(formData._actionType === 'AddTransaction'){
        return await addTransactionAction(formData);
    }
    else{
        console.log({data, request, formData});
        try{
            localStorage.setItem("userName", JSON.stringify(formData.email));
            return toast.success(`Welcome ${formData.email}`);
        }
        catch (e){
            throw new Error("Unable to sign In");
        }
    }
}

const DashBoard = () => {
    const [name, setName] = useState("Hello");
    const {data, isLoading, error} = useFetch('api/accounts');

    const OnSubmit=()=>{
        console.log("Clicked");
        setName("Clicked");
    }
    const {userName} = useLoaderData()
    return (
        <div>
            {
                userName ? (
                    <>
                    <h1 className="text-6xl font-bold" >
                        {name} {userName}!!
                    </h1>
                    <div className="flex flex-col items-center gap-y-3">
                    <Button className="rounded-full" color="green" onClick={OnSubmit} >Submit</Button>
                    { isLoading && <Button variant="outlined" loading={true}>Loading</Button>}
                    { error &&  <h1 className="text-6xl font-bold" >{error}</h1>}
                    </div>
                    <div className="mb-4 flex items-start gap-x-6">
                        { data?.accounts && <AccountList accounts={data.accounts.filter((a) => a.type==="Savings")} title="Savings Accounts"/> }
                        { data?.accounts && <AccountList accounts={data.accounts.filter((a) => a.type==="Credit Card")} title="Credit Card Accounts"/>}    
                        <AddTransaction />
                    </div>
                    </>
                ) : (
                    <Home />
                )
            }

           
        </div>
    )
}

export default DashBoard