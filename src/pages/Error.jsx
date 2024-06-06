import { NavLink, useNavigate, useRouteError } from "react-router-dom"

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <>
        <div className="flex justify-center">
                Sorry, The Page not found.
                {error.message || error.statusText} 
        </div>
        <div className="flex flex-row gap-x-4 justify-center items-center">
            <NavLink to={navigate(-1)}>Back</NavLink>
            <NavLink to="/" >Home</NavLink>
        </div>
        </>
    )
}

export default Error