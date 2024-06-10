import { Form, useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";
import 'rsuite/DatePicker/styles/index.css';
import { addBudgetAction } from "../actions/addBudget";

export async function AddBudgetAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    return await addBudgetAction(formData);
    
}

const AddBudget = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef= useRef();

    useEffect(() => {
        if (!isSubmitting) {
            console.log("UseEffect")
            formRef.current.reset() // It clears form if we didn't bind values.
        }
    }, [isSubmitting])

    return (
        <div className="mb-4 justify-between w-320 max-w-screen-xl sm:w-96">
            <Typography color="red" variant="h2">Add Budget</Typography>
            <div>
            <fetcher.Form 
                method="post" 
                ref={formRef}
                className="mt-8 mb-6"
            >
                <input type="hidden" name="_actionType" value="AddBudget" />
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Name:
                    </Typography>
                    <Input type="text" label="Name" name="name" required />
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3 " variant="small" color="gray">
                    Type:
                    </Typography>
                    <Select label="Type" required >
                        <Option value="Credit">Expense</Option>
                        <Option value="Debit">Income</Option>
                    </Select>
                </div>
                <div className="mb-6 flex flex-row gap-6 items-center">
                    <Typography className="flex-col w-1/3" variant="small" color="gray">
                    Amount:
                    </Typography>
                    <Input type="number" label="Amount" name="amount" required />
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

export default AddBudget