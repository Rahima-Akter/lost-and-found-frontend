import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://lost-and-found-server-two.vercel.app',
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                if (error.response.status === 401 || error.response.status === 403) {
                    // logout
                    logOut()
                    // navigate to login
                    navigate('/login')
                }
            }
        )
    }, [logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;