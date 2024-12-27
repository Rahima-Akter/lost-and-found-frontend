import { useContext } from "react";
import { authContext } from "../Context/Context";

const useAuth = () => {
    const authHook = useContext(authContext)
    return authHook;
};

export default useAuth;