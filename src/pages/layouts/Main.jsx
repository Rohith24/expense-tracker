import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../Service/helpers";
import { NavbarDefault } from "../../Nav/Navbar";
import { Footer } from "./Footer";

export function MainLoader(){
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const {userName} = useLoaderData()
    return (
        <div>
            <main>
                <NavbarDefault userName={userName} />
                <div className="mx-auto max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4">
                <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default Main