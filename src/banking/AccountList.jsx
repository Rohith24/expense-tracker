import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";

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
                {accounts.map(({ name, bankId, balance, type }, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                    >
                    <div className="flex flex-col gap-y-0">
                        <Typography color="brown" variant="h6" className="text-left">
                            {name}
                        </Typography>
                        <Typography variant="small" color="gray">
                            {bankId} - {type}
                        </Typography>
                    </div>

                    <Typography color="blue-gray" as="a"
                    href="/"
                    variant="small"
                    className="font-bold">
                        ₹{balance}
                    </Typography>
                    </div>
                ))}
                </div>
            </CardBody>
        </Card>
     );
}
 
export default AccountList;