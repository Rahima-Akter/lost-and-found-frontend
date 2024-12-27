import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Forms/Login/Login";
import Register from "../Forms/Login/Register";
import Home from "../pages/Home/Home";
import AddLostFoundItem from "../pages/AddPost/AddLostFoundItem ";
import AllItems from "../components/AllItems";
import Details from "../components/Details";
import ManageMyItems from "../pages/ManageMyItems/ManageMyItems";
import UpdateItem from "../components/UpdateItem";
import AllRecovered from "../pages/AllRecovered/AllRecovered";
import Toggle from "../pages/AllRecovered/Toggle";
import AllRecoveredCard from "../pages/AllRecovered/AllRecoveredCard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound/>
    },
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch('https://lost-and-found-server-two.vercel.app/item')
            },
            {
                path: '/allItem',
                element: <AllItems />,
                loader: () => fetch('https://lost-and-found-server-two.vercel.app/item')
            },
            {
                path: '/myItems',
                element: <PrivateRoute>
                    <ManageMyItems />
                </PrivateRoute>,
            },
            {
                path: '/recovered',
                element: <PrivateRoute>
                    <Toggle />
                </PrivateRoute>,
                children: [
                    {
                        path: '/recovered',
                        element: <PrivateRoute>
                            <AllRecovered />
                        </PrivateRoute>
                    },
                    {
                        path: '/recovered/card',
                        element: <PrivateRoute>
                            <AllRecoveredCard />
                        </PrivateRoute>
                    },
                ]
            },
            {
                path: '/details/:id',
                element: <PrivateRoute>
                    <Details />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://lost-and-found-server-two.vercel.app/singleItem/${params.id}`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/addLostFound',
                element: <PrivateRoute>
                    <AddLostFoundItem />
                </PrivateRoute>
            },
            {
                path: '/update/:id',
                element: <PrivateRoute>
                    <UpdateItem />
                </PrivateRoute>,
            },
        ]
    },

])

export default router;