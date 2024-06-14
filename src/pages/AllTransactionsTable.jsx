import { Card, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { getTransactions } from "../Service/TransactionService";
import { getBudgets } from "../Service/BudgetService";
import { TransactionTable } from "../components/TransactionTable";
import BudgetBarChart from "../components/Charts/BudgetBarChart";
 
export async function transactionLoader(){

    const [budgets, data] = await Promise.all([
      getBudgets(),
      getTransactions({})
    ]);

    const transactions = data.transactions;
    return { transactions, budgets }
}


 
export function AllTransactionsTable() {

    const {transactions, budgets} = useLoaderData()
    const navigate = useNavigate();

  return (
    transactions && <Card className="h-full w-full">
        <div className="m-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="">
              All Transactions
          </Typography>
          <Typography
              variant="small"
              color="blue"
              className="font-bold"
          >
            <NavLink  onClick={()=>navigate(-1)}>Back</NavLink>
          </Typography>
          </div>
          <BudgetBarChart budgets={budgets.budgets} />
          <TransactionTable transactions={transactions} />
    </Card>
  );
}