import { useLoaderData } from "react-router-dom";
import { fetchData } from "../Service/helpers"
import { useState } from "react";
import AccountList from "../banking/AccountList";
import { Button } from "@material-tailwind/react";
import Home from "../components/Home";
import AddTransaction from "../components/AddTransaction";
import { toast } from "react-toastify";
import { addTransactionAction } from "../actions/addTransaction";
import { loginAction } from "../actions/login";
import AddBudget from "../components/AddBudget";
import { addBudgetAction } from "../actions/addBudget";
import { getDashboardData } from "../Service/DashboardService";


export async function dashBoardLoader(){
    const userName = fetchData("userName");
    const data = await getDashboardData();
    return { userName, data }
}

export async function DashboardAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    if(formData._actionType === 'login'){
        return await loginAction(formData);
    }else if(formData._actionType === 'AddTransaction'){
        const transaction = await addTransactionAction(formData);
        // const updatedAccount = transaction.fromAccount
        // if (updatedAccount) {
        //     setAccounts((prevAccounts) => {
        //         const a= prevAccounts.map((account) => {
        //             console.log({account, updatedAccount});
        //             return (account._id === updatedAccount._id) ? updatedAccount : account
        //         });
        //         console.log(a);
        //         return a;
        //     });
        // }
        // const toAccount = transaction.toAccount
        // if (toAccount) {
        //     setAccounts((prevAccounts) => {
        //         const a= prevAccounts.map((account) => {
        //             console.log({account, toAccount});
        //             return (account._id === toAccount._id) ? toAccount : account
        //         });
        //         console.log(a);
        //         return a;
        //     });
        // } -- It is not updating as setAccount is not accessible.
        return transaction;
    }
    else if(formData._actionType === 'AddBudget'){
        return await addBudgetAction(formData);
    }
    else{
        return toast.warn(`No Action taken`);
    }
}

const DashBoard = () => {
    const [name, setName] = useState("Hello");

    const OnSubmit=()=>{
        console.log("Clicked");
        setName("Clicked");
    }
    const {userName, data} = useLoaderData()
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
                    </div>
                    <div className="mb-4 flex items-start gap-x-6">
                        { data?.accounts && <AccountList accounts={data?.accounts.filter((a) => a.type==="Savings")} title="Savings Accounts"/> }
                        { data?.accounts && <AccountList accounts={data?.accounts.filter((a) => a.type==="Credit Card")} title="Credit Card Accounts"/>}    
                        <AddBudget />
                    </div>
                    <div className="mb-4 flex items-start gap-x-6">
                    { data?.accounts && <AddTransaction accounts={data?.accounts} budgets={data?.budgets} /> }
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