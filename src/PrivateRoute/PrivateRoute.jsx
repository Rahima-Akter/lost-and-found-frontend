import { useContext } from "react";
import { authContext } from "../Context/Context";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(authContext)
    const location = useLocation()

    if (loading) {
        return <div className="w-full py-10 flex justify-center items-center">
            
            </div>
    }

    if (!user) {
        return <Navigate state={{ from: location }} to="/login"></Navigate>
    }

    return children;
};


export default PrivateRoute;