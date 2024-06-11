import { Link, useLoaderData } from "react-router-dom";
import { fetchData, formatCurrency } from "../Service/helpers"
import { useState } from "react";
import AccountList from "../banking/AccountList";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Home from "../components/Home";
import AddTransaction from "../components/AddTransaction";
import { toast } from "react-toastify";
import { addTransactionAction } from "../actions/addTransaction";
import { loginAction } from "../actions/login";
import AddBudget from "../components/AddBudget";
import { addBudgetAction } from "../actions/addBudget";
import { getDashboardData } from "../Service/DashboardService";
import BudgetPieChart from "../components/Charts/BudgetPieChart";
import BudgetBarChart from "../components/Charts/BudgetBarChart";
import { RecentTransactions } from "../components/RecentTransactions";


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
        userName ? (
            data?.accounts && (
            <>
                <div className="mb-4 flex items-start gap-x-6">
                    <BudgetPieChart budgets={data.budgets}/>
                    <AddTransaction accounts={data.accounts} budgets={data.budgets} />
                    <BudgetBarChart budgets={data.budgets}/>
                </div> 
                <div className="mb-4 flex items-start gap-x-6">
                    <AccountList accounts={data.accounts.filter((a) => a.type==="Savings")} title="Savings Accounts"/>
                    <AccountList accounts={data.accounts.filter((a) => a.type==="Credit Card")} title="Credit Card Accounts"/>
                    <AddBudget />
                </div>
                <div className="mb-4 flex items-start gap-x-6">
                    <RecentTransactions transactions={data.recentTransactions}/>
                </div>
            </>)) : 
            (
            <Home />
            )
    )
}

export default DashBoard