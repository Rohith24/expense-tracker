import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { SaveAccount } from "../Service/AccountService";
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const AccountForm = () => {
    const {data} = useLoaderData();

    const account = data.account;

    const [accountType, setAccountType] = useState(account?.type);
    const [name, setName] = useState(account?.name ?? '');
    const [bankName, setBankName] = useState(account?.bankId ?? '');
    const [currency, setCurrency] = useState(account?.currency ?? '');
    const [initBalance, setInitBalance] = useState(account?.initBalance ?? 0);
    const [interest, setInterest] = useState(account?.interest ?? 1);
    const [isPending, setIsPending] = useState(false);
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const accountDetails = account;
        accountDetails.bankId = bankName;
        accountDetails.name = name;
        accountDetails.type = accountType;
        accountDetails.currency = currency;
        accountDetails.interest = interest;
        setIsPending(true);
        SaveAccount({account: accountDetails, user: "hello"}).then((resp) => {
            if(resp.code === '0'){
                toast.success(resp.message);
                navigation(-1);
            }else{
                toast.error("Unable to update Account: " + resp.message);
            }
        }).catch((message) => {
            toast.error(message);
            console.log(message);
        }).finally(()=>{
            setIsPending(false);
        });
    }

    return ( 
        <div className="flex flex-col gap-4 items-center">
            <Typography color="red" variant="h2">Edit Account</Typography>
            <div>
            <form className="mt-8 mb-6 w-450 max-w-screen-lg sm:w-96 items-center" onSubmit={handleSubmit}>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Account Type:
                    </Typography>
                    <Select label="Account Type" required value={accountType} onChange={setAccountType}>
                        <Option value="Savings">Savings</Option>
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="FD">FD</Option>
                        <Option value="Mutual">Mutual Funds</Option>
                        <Option value="Cash">Cash</Option>
                    </Select>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Account Name:
                    </Typography>
                    <Input type="text" value={name} required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Bank Name:
                    </Typography>
                    <Input type="text" required value={bankName} onChange={(e) => setBankName(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Currency:
                    </Typography>
                    <Select label="Currency" required value={currency} onChange={setCurrency}>
                        <Option value="INR">INR</Option>
                        <Option value="USD">USD</Option>
                    </Select>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Initial Balance:
                    </Typography>
                    <Input type="number" disabled value={initBalance} onChange={(e) => setInitBalance(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Balance:
                    </Typography>
                    <Input type="number" disabled value={account?.balance} onChange={(e) => setInitBalance(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Interest:
                    </Typography>
                    <Input type="number" required label="Interest Percentage" value={interest} onChange={(e) => setInterest(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Button className="mt-6 text-center" fullWidth onClick={handleSubmit} loading={isPending}>Submit</Button>
                </div>
            </form>
            </div>
       </div>
     );
}
 
export default AccountForm;