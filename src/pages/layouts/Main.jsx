import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { fetchData } from "../../Service/helpers";
import { NavbarDefault } from "../../Nav/Navbar";
import { Footer } from "./Footer";
import Loading from "../../components/Loading";


export function MainLoader(){
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()

    const { state } = useNavigation()
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow" >
                <NavbarDefault userName={userName} />
                {
                    (state === 'loading') ? 
                        <Loading />
                    : (
                        <div className="mx-auto max-w-screen-2xl py-2">
                            <Outlet />
                        </div>
                    )
                }
            </main>
            <Footer />
        </div>
    )
}

export default Main