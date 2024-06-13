import { Typography } from "@material-tailwind/react";
import { formatCurrency, formatDateToLocaleString } from "../Service/helpers";
import { NavLink } from "react-router-dom";

function getColorBasedonType(type){
    return type === "Credit" ? "green" : type === "Debit"? "red": "black";
  }

export function TransactionTable({transactions}) {
    const TABLE_HEAD = ["Sl.No", "Date", "Type", "Account Name", "Budget Name",  "Details", "Amount", ""];
    console.log(transactions);
  return (
    <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
        {TABLE_HEAD.map((head) => (
          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >
              {head}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {transactions.map(({ transactionDate, details, amount, type, fromAccount, toAccount, budget, category }, index) => {
        let accountDetails = fromAccount ?? toAccount
        return (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index+1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {formatDateToLocaleString(transactionDate)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color={getColorBasedonType(type)} className="font-normal">
                  {type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {
                        fromAccount?.name !== null && fromAccount?.name !== undefined ? (toAccount?.name !== null && toAccount?.name !== undefined ? 
                        (<><NavLink to={`/accounts/${fromAccount._id}`}>{fromAccount?.name}</NavLink>{" - "} 
                         <NavLink to={`/accounts/${toAccount._id}`}>{toAccount?.name}</NavLink></>
                        ) : <NavLink to={`/accounts/${fromAccount._id}`}>{fromAccount?.name}</NavLink>) : <NavLink to={`/budgets/${budget._id}`}>{toAccount?.name}</NavLink>
                    }
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="light-blue" className="font-normal">
                    {
                        budget?.name ? (<NavLink to={`/budgets/${budget._id}`}>{budget?.name}</NavLink>) : category
                    }
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {details}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color={getColorBasedonType(type)} className="font-normal">
                  {formatCurrency(amount, accountDetails?.currency ?? "INR")}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
          )
      }
      )}
    </tbody>
  </table>
  );
}