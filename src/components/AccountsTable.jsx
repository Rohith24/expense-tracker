import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "../Service/helpers";
import { NavLink } from "react-router-dom";

export function AccountsTable({accounts}) {
    const TABLE_HEAD = ["Sl.No", "Name", "Bank", "Account Type", "Available Balance",  "Initial Balance", "Interest", ""];
    console.log(accounts);
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
      {accounts.sort((a, b) => {
        if (a.type < b.type) return 1;
        if (a.type > b.type) return -1;
        return 0;
      }).map(({ name, bankId, type, balance, initBalance, currency, interest, _id }, index) => {
        return (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {index+1}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  <NavLink to={`/accounts/${_id}`}>{name}</NavLink>
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {bankId}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {type}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {formatCurrency(balance, currency ?? "INR")}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {formatCurrency(initBalance, currency ?? "INR")}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {interest}%
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