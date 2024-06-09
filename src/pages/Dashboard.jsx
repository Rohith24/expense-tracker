import { useLoaderData } from "react-router-dom";
import { fetchData } from "../Service/helpers"
import { useContext, useEffect, useState } from "react";
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
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (data && data.accounts) {
            setAccounts(data.accounts);
        }
    }, [data]);

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
                        { accounts && <AccountList accounts={accounts.filter((a) => a.type==="Savings")} title="Savings Accounts"/> }
                        { accounts && <AccountList accounts={accounts.filter((a) => a.type==="Credit Card")} title="Credit Card Accounts"/>}    
                        { accounts && <AddTransaction accounts={accounts} /> }
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