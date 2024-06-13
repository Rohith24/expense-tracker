import { Card, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { getAccounts } from "../Service/AccountService";
import { AccountsTable } from "../components/AccountsTable";
import { AccountBalance } from "../components/AccountBalance";
import { generateUniqueColors } from "../Service/helpers";
 
export async function accountsLoader(){

    const data = await getAccounts();
    const accounts = data.accounts;
    return { accounts }
}


 
export function Accounts() {
    const {accounts} = useLoaderData()
    const navigate = useNavigate();

    const totalBalanceByType = accounts.reduce((acc, account) => {
        if (!acc[account.type]) {
          acc[account.type] = 0;
        }
        acc[account.type] += account.balance;
        return acc;
      }, {});
    
    const colors = generateUniqueColors(Object.entries(totalBalanceByType).length);

    return (
        accounts && <>
        <div className="flex justify-between gap-2">
            { 
                totalBalanceByType && Object.entries(totalBalanceByType).map(([type, amount], i) => (
                    <AccountBalance key={type} title={type} amount={amount} customColor={colors[i]} />
                ))
            }
        </div>
        <Card className="h-full w-full">
            <div className="m-4 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="">
                All Accounts
            </Typography>
            <Typography
                variant="small"
                color="blue"
                className="font-bold"
            >
                <NavLink  onClick={()=>navigate(-1)}>Back</NavLink>
            </Typography>
            </div>
            <AccountsTable accounts={accounts} />
        </Card>
        </>
    );
}