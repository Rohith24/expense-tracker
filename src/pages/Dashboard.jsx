import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"

export function dashBoardLoader(){
    const userName = fetchData("userName");
    return { userName }
}

const DashBoard = () => {
    const {userName} = useLoaderData()
    return (
        <div>
            <h1 className="text-6xl font-bold underline">
                Hello world!
            </h1>
        </div>
    )
}

export default DashBoard