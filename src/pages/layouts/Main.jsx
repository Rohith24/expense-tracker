import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers";

export function MainLoader(){
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const {userName} = useLoaderData()
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Main