import { useLoaderData } from "react-router-dom";
import { fetchData } from "../Service/helpers"
import { useState } from "react";
import AccountList from "../banking/AccountList";
import { Button } from "@material-tailwind/react";
import useFetch from "../Service/useFetch";


export function dashBoardLoader(){
    const userName = fetchData("userName");
    return { userName }
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
            </div>
        </div>
    )
}

export default DashBoard