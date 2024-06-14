import { generateUniqueColors } from "../../Service/helpers";
import { AccountBalance } from "../AccountBalance";

export function AccountsValue({accounts}) {

    const totalBalanceByType = accounts.reduce((acc, account) => {
        if(!acc["Total"])
            acc["Total"] = 0;
        if (!acc[account.type]) {
          acc[account.type] = 0;
        }
        acc[account.type] += account.balance;
        acc["Total"] += account.balance;
        return acc;
      }, {});
    
    const colors = generateUniqueColors(Object.entries(totalBalanceByType).length);
    
    return (
        accounts &&
        <div className="flex justify-between gap-2">
            { 
            
                totalBalanceByType && Object.entries(totalBalanceByType).map(([type, amount], i) => (
                    <AccountBalance key={type} title={type} amount={amount} customColor={colors[i]} />
                ))
            }
        </div>
    );
}