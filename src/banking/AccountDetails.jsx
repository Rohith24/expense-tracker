import { useParams } from "react-router-dom";
import useFetch from "../Service/useFetch";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const AccountDetails = () => {
    const {id} = useParams();
    const {data, error, isLoading} = useFetch(`api/accounts/${id}`)
    return ( 
        <div className="contents">
            { isLoading && <Button variant="outlined" loading={true}>Loading</Button>}
            { error &&  <h1 className="text-6xl font-bold" >{error}</h1>}
            { data?.account && 
                <Card className="w-100">
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
            }
        </div>
     );
}
 
export default AccountDetails;