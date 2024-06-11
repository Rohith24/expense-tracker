import { Card, Typography } from "@material-tailwind/react";
import {  NavLink } from "react-router-dom";
import { TransactionTable } from "./TransactionTable";
 
export function RecentTransactions({transactions}) {
  return (
    <Card className="h-full w-full">
        <div className="m-4 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="">
                Recent Transactions
            </Typography>
            <Typography
                variant="small"
                color="blue"
                className="font-bold"
            >
            <NavLink to="/transactions">View all</NavLink>
            </Typography>
        </div>
        <TransactionTable transactions={transactions} />
    </Card>
  );
}