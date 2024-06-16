import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { DeleteAccount, getAccount } from "../Service/AccountService";
import { TransactionTable } from "../components/TransactionTable";
import { fetchData } from "../Service/helpers";


export async function accountDetailsLoader({params}){
    const userName = fetchData("userName");
    const data = await getAccount(params.id);
    return { data, userName }
}

const AccountDetails = () => {
    const {id} = useParams();
    const {data} = useLoaderData();

    const [isPending, setIsPending] = useState(false);
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        DeleteAccount({id, user: "deleteUser"}).then((resp) => {
            console.log(resp);
            navigation('/');
        }).catch((message) => {
            console.log(message);
        }).finally(()=>{
            setIsPending(false);
        });
    }

    return ( 
             data?.account && 
                <>
                <Card className="flex w-100">
                    <CardBody>
                        <div
                        key={data?.account?._id}
                        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                        >
                        <Typography color="brown" variant="h6" className="text-left">
                            Nick Name
                        </Typography>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {data?.account?.name}
                        </Typography>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div
                        key={data?.account?._id}
                        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                        >
                        <Typography color="brown" variant="h6" className="text-left">
                            Bank Name
                        </Typography>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {data?.account?.bankId}
                        </Typography>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div
                        key={data?.account?._id}
                        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                        >
                        <Typography color="brown" variant="h6" className="text-left">
                            Type Name
                        </Typography>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {data?.account?.type}
                        </Typography>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div
                        key={data?.account?._id}
                        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                        >
                        <Typography color="brown" variant="h6" className="text-left">
                            Balance
                        </Typography>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            ₹{data?.account?.balance}
                        </Typography>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div
                        key={data?.account?._id}
                        className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                        >
                        <Typography color="brown" variant="h6" className="text-left">
                            Interest
                        </Typography>
                        <Typography color="blue-gray"
                        variant="small"
                        className="font-bold">
                            {data?.account?.interest}%
                        </Typography>
                        </div>
                    </CardBody>
                </Card>
                <div className="mb-6 flex flex-row gap-6">
                    <Button className="mt-6 text-center" fullWidth onClick={handleSubmit} loading={isPending}>Delete</Button>
                </div>
                {
                    data.account.Transactions && <TransactionTable transactions={data.account.Transactions} />
                }
                </>
     );
}
 
export default AccountDetails;