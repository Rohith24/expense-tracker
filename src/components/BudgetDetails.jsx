import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Card, CardBody, Option, Select, Typography } from "@material-tailwind/react";
import 'rsuite/DatePicker/styles/index.css';
import { getBudget } from "../Service/BudgetService";
import { formatCurrency } from "../Service/helpers";
import { getTransactions } from "../Service/TransactionService";
import { RecentTransactions } from "./RecentTransactions";

export async function budgetDetailsLoader({params}){
    const data = await getBudget(params.id);
    const trans = await getTransactions({budgetId: params.id});
    const budget = data.budget;
    const transactions = trans.transactions;
    return { budget, transactions }
}

const BudgetDetails = () => {
    const {budget, transactions} = useLoaderData();
    return (
        <div className="gap-4">
            <Card className="w-96">
            <CardBody>
                <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="">
                Budget Details - {budget.name}
                </Typography>
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue"
                    className="font-bold"
                >
                    View all
                </Typography>
                </div>
                <div className="divide-y-4 divide-gray-200">
                    <div className="flex items-center justify-between pb-3 pt-3 last:pb-0" >
                        <div className="flex flex-col gap-y-0">
                            <Typography to={`/accounts/${budget._id}`} color="brown" variant="h6" className="text-left">
                                Name
                            </Typography>
                        </div>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {budget.name}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between pb-3 pt-3 last:pb-0" >
                        <div className="flex flex-col gap-y-0">
                            <Typography to={`/accounts/${budget._id}`} color="brown" variant="h6" className="text-left">
                                Spent
                            </Typography>
                        </div>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {formatCurrency(budget.tillNow, "INR")}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between pb-3 pt-3 last:pb-0" >
                        <div className="flex flex-col gap-y-0">
                            <Typography to={`/accounts/${budget._id}`} color="brown" variant="h6" className="text-left">
                                Left
                            </Typography>
                        </div>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {formatCurrency(budget.amount, "INR")}
                        </Typography>
                    </div>
                </div>
            </CardBody>
        </Card>
        <RecentTransactions transactions={transactions}/>
       </div>
    )
}

export default BudgetDetails