import { useContext } from "react";
import { authContext } from "../Context/Context";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext)
    const location = useLocation()

    if (loading) {
        return <div className="w-full py-52 flex justify-center items-center"><span className="loading loading-bars loading-lg bg-[#15C8A0]"></span></div>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    return children;
};


export default PrivateRoute;