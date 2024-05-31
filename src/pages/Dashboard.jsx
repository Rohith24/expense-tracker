import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"
import { useState } from "react";
import AccountList from "../banking/AccountList";
import { Button } from "@material-tailwind/react";
import useFetch from "../useFetch";


export function dashBoardLoader(){
    const userName = fetchData("userName");
    return { userName }
}



const DashBoard = () => {
    const [name, setName] = useState("Hello World");
    const {data, isLoading, error} = useFetch('http://localhost:1337/api/accounts');

    const OnSubmit=()=>{
        console.log("Clicked");
        setName("Clicked");
    }
    const {userName} = useLoaderData()
    return (
        <div>
            <h1 className="text-6xl font-bold" >
                {name}
            </h1>
            <div className="flex flex-col items-center gap-y-3">
            <Button className="rounded-full" color="green" onClick={OnSubmit} >Submit</Button>
            { isLoading && <Button variant="outlined" loading={true}>Loading</Button>}
            { error &&  <h1 className="text-6xl font-bold" >
                {error}
            </h1>}
            </div>
            <div className="mb-4 flex items-start gap-x-6">
                { data && <AccountList accounts={data.filter((a) => a.type==="Savings")} title="Savings Accounts"/> }
                { data && <AccountList accounts={data.filter((a) => a.type==="Credit Card")} title="Credit Card Accounts"/>}    
            </div>
        </div>
    )
}

export default DashBoard