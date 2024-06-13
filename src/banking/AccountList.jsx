import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { formatCurrency } from "../Service/helpers";

const AccountList = ({accounts, title}) => {

    // const accounts = props.accounts;
    // const title = props.title;

    return accounts != null && accounts.length>0 && ( 
        <Card className="w-96">
            <CardBody>
                <div className="mb-4 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="">
                    {title}
                </Typography>
                <Typography
                    variant="small"
                    color="blue"
                    className="font-bold"
                >
                    <NavLink to="/accounts">View all</NavLink>
                </Typography>
                </div>
                <div className="divide-y-4 divide-gray-200">
                {accounts.map(({ _id, name, bankId, balance, type, currency }, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                    >
                    <div className="flex flex-col gap-y-0">
                        <Link to={`/accounts/${_id}`} color="brown" variant="h6" className="text-left">
                            {name}
                        </Link>
                        <Typography variant="small" color="gray">
                            {bankId} - {type}
                        </Typography>
                    </div>

                    <Typography color="blue-gray" as="a"
                    href="/"
                    variant="small"
                    className="font-bold">
                        {formatCurrency(balance, currency)}
                    </Typography>
                    </div>
                ))}
                </div>
            </CardBody>
        </Card>
     );
}
 
export default AccountList;