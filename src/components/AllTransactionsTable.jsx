import { Card, Typography } from "@material-tailwind/react";
import { formatCurrency, formatDateToLocaleString } from "../Service/helpers";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { formatTransactions, getTransactions } from "../Service/TransactionService";
import { getAccounts } from "../Service/AccountService";
import { getBudgets } from "../Service/BudgetService";
import { TransactionTable } from "./TransactionTable";
 
export async function transactionLoader(){

    const [accounts, budgets, data] = await Promise.all([
      getAccounts(),
      getBudgets(),
      getTransactions()
    ]);

    const transactions = await formatTransactions(accounts.accounts, budgets.budgets, data.transactions);
    return { transactions }
}


 
export function AllTransactionsTable() {

    const {transactions} = useLoaderData()
    const navigate = useNavigate();


    const TABLE_HEAD = ["Sl.No", "Type", "Account Name", "Budget Name", "Date", "Details", "Amount", ""];
 
    
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
          <NavLink to={navigate(-1)}>Back</NavLink>
          </Typography>
          </div>
          <TransactionTable transactions={transactions} />
    </Card>
  );
}