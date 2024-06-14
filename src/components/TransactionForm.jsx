import { Form, useFetcher } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react";
import DatePicker from 'rsuite/DatePicker';
import 'rsuite/DatePicker/styles/index.css';
import { addTransactionAction } from "../actions/addTransaction";

const TransactionForm = ({title, isEdit = false, accounts, budgets, transaction}) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef= useRef();

    const [type, setType] = useState('Debit');
    const [fromAccount, setFromAccount] = useState(transaction?.fromAccountId ?? '');
    const [toAccount, setToAccount] = useState(transaction?.toAccountId ?? '');
    const [amount, setAmount] = useState(transaction?.amount ?? 0);
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentDate, setCurrentDate] = useState(today);
    const [date, setDate] = useState(today);
    const [transferId, setTransferId] = useState();
    
    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset() // It clears form if we didn't bind values.
            setType(transaction?.fromAccountId !== null && transaction?.fromAccountId !== undefined ? transaction?.toAccountId !== null && transaction?.toAccountId !== undefined ?'Transfer': 'Debit' : 'Credit')
            setFromAccount(transaction?.fromAccountId ?? '')
            setToAccount(transaction?.toAccountId ?? '')
            setDate(transaction?.transactionDate ? new Date(transaction?.transactionDate) : today)
            setCurrentDate(transaction?.transactionDate ? new Date(transaction?.transactionDate) : today)
            setAmount(transaction?.amount ?? 0)
            setCategory(transaction?.category ?? '')
            setDetails(transaction?.details ?? '')
        }
    }, [isSubmitting])

    useEffect(()=>{
        setTransferId(budgets.find((b)=>b.name === "Transfer")?._id);
    }, [budgets])

    const handleDateChange = (date) => {
        setDate(date);
        setCurrentDate(date);
    };

    return (
        <Card className="mb-4 justify-between max-w-screen-lg sm:w-96">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center justify-between"
            >
            <Typography color="red" variant="h4">{title}</Typography>
            </CardHeader>
            <CardBody className="p-4">
            <fetcher.Form 
                method="post" 
                ref={formRef}
                className="mt-8 mb-6"
            >
                <input type="hidden" name="_id" value={transaction?._id} />
                <input type="hidden" name="changeCount" value={transaction?.changeCount} />
                <input type="hidden" name="tenantCode" value={transaction?.tenantCode} />
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
                            <select  name="category" label="Category" required value={(type === "Transfer") ? transferId : category} onChange={(e) => setCategory(e.target.value)}
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
                        isSubmitting ? isEdit ? "Updating transaction" : "Creating transaction" : isEdit ? "Update transaction" : "Create Transaction"
                    }</Button>
                </div>
            </fetcher.Form>
            </CardBody>
       </Card>
    )
}

export default TransactionForm