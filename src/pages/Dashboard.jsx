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
            <hi>{userName}</hi>
            DashBoard
        </div>
    )
}

export default DashBoard