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

const AddTransaction = ({accounts, budgets}) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef= useRef();

    const [type, setType] = useState('Debit');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentDate, setCurrentDate] = useState(today);
    const [date, setDate] = useState(today);

    useEffect(() => {
        if (!isSubmitting) {
            console.log("UseEffect")
            formRef.current.reset() // It clears form if we didn't bind values.
            setType('Debit')
            setFromAccount('')
            setToAccount('')
            setDate(today)
            setCurrentDate(today)
            setAmount(0)
            setCategory('')
            setDetails('')
        }
    }, [isSubmitting])

    const handleDateChange = (date) => {
        setDate(date);
        setCurrentDate(date);
        console.log(date ? date.toISOString() : 'No date selected');
    };

    return (
        <div className="mb-4 justify-between max-w-screen-lg sm:w-96">
            <Typography color="red" variant="h2">Add New Transaction</Typography>
            <div>
            <fetcher.Form 
                method="post" 
                ref={formRef}
                className="mt-8 mb-6"
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
                {
                    (type !== "Credit") && 
                    <div className="mb-6 flex flex-row gap-6 items-center">
                        <Typography className="flex-col w-1/3" variant="small" color="gray">
                        {
                            (type === "Transfer") && "From "
                        }
                        Account:
                        </Typography>
                        <select  name="fromAccountId" label="From Account" required value={fromAccount} onChange={(e) => setFromAccount(e.target.value)}
                        className="w-full h-full bg-transparent text-blue-gray-700 fxt-left outline outline-0 focus:outline-0 ont-sans font-normal tedisabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
                        >
                            {
                                accounts.map((account)=>{
                                    return (
                                        <option value={account._id}>{account.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                {
                    (type !== "Debit") && 
                    <div className="mb-6 flex flex-row gap-6 items-center">
                        <Typography className="flex-col w-1/3" variant="small" color="gray">
                        {
                            (type === "Transfer") && "To "
                        }
                        Account:
                        </Typography>
                        <select  name="toAccountId" label="To Account" required value={toAccount} onChange={(e) => setToAccount(e.target.value)}
                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200">
                            {
                                accounts.map((account)=>{
                                    return (
                                        <option value={account._id}>{account.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                }
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Amount:
                    </Typography>
                    <Input type="number" label="Amount" name="amount" value={amount} required onChange={(e) => setAmount(e.target.value)}/>
                </div>
                {
                    budgets && budgets.length > 0 ?
                    (
                        <div className="mb-6 flex flex-row gap-6 items-center">
                            <Typography className="flex-col w-1/3" variant="small" color="gray">
                            Category:
                            </Typography>
                            <select  name="category" label="Category" required value={category} onChange={(e) => setCategory(e.target.value)}
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200">
                                {
                                    budgets?.map((budget)=>{
                                        return (
                                            <option value={budget._id}>{budget.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    ) : (
                        <div className="mb-6 flex flex-row gap-6 items-center">
                            <Typography className="flex-col w-1/3" variant="small" color="gray">
                            Category:
                            </Typography>
                            <Input type="text" label="Category" name="category" value={category} required onChange={(e) => setCategory(e.target.value)}/>
                        </div>
                    )
                }
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Details:
                    </Typography>
                    <Input type="text" label="Details" name="details" value={details} onChange={(e) => setDetails(e.target.value)}/>
                </div>
                <div className="mb-6 flex flex-row gap-6">
                    <Button className="mt-6 text-center items-center justify-center" fullWidth type="submit" title="Create Transaction" loading={isSubmitting}>{
                        isSubmitting ? "Creating transaction" : "Create Transaction"
                    }</Button>
                </div>
            </fetcher.Form>
            </div>
       </div>
    )
}

export default AddTransaction