import { Form, useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import { addTransactionAction } from "../actions/addTransaction";

export async function AddTransactionAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    return await addTransactionAction(formData);
    
}

const AddTransaction = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef= useRef();

    const [type, setType] = useState('');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentDate, setCurrentDate] = useState(today);
    const [date, setDate] = useState(today);

    useEffect(() => {
        if (!isSubmitting) {
            console.log("UseEffect")
            formRef.current.reset() // It clears form if we didn't bind values.
            setType('')
            setFromAccount('')
            setToAccount('')
            setDate(today)
            setCurrentDate(today)
            setAmount('')
            setCategory('')
        }
      }, [isSubmitting])

      const handleDateChange = (date) => {
        setDate(date);
        setCurrentDate(date);
        console.log(date ? date.toISOString() : 'No date selected');
      };
    
    return (
        <div className="mb-4 justify-between">
            <Typography color="red" variant="h2">Add New Transaction</Typography>
            <div>
            <fetcher.Form 
                method="post" 
                ref={formRef}
                className="mt-8 mb-6 w-450 max-w-screen-lg sm:w-96"
            >
                <input type="hidden" name="_actionType" value="AddTransaction" />
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Date:
                    </Typography>
                    <input type="hidden" name="transactionDate" value={date} />
                    <DatePicker oneTap format="dd-MM-yyyy" className="flex-col w-11/12" onChange={handleDateChange} value={currentDate} />
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3 " variant="small" color="gray">
                    Type:
                    </Typography>
                    <Select label="Type" required value={type} onChange={setType}>
                        <Option value="Credit">Credit</Option>
                        <Option value="Debit">Debit</Option>
                        <Option value="Transfer">Transfer</Option>
                    </Select>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    From Account:
                    </Typography>
                    <Input type="text" name="fromAccountId" value={fromAccount} required onChange={(e) => setFromAccount(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    To Account:
                    </Typography>
                    <Input type="text" name="toAccountId" value={toAccount} required onChange={(e) => setToAccount(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Amount:
                    </Typography>
                    <Input type="text" label="Amount" name="amount" value={amount} required onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Category:
                    </Typography>
                    <Input type="text" label="Category" name="category" value={category} required onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6">
                    <Button className="mt-6 text-center items-center justify-center" fullWidth type="submit" loading={isSubmitting}>{
                        isSubmitting ? "Creating transaction" : "Create Transaction"
                    }</Button>
                </div>
            </fetcher.Form>
            </div>
       </div>
    )
}

export default AddTransaction