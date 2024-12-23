import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

const router = createBrowserRouter([
    // {
    //     path: '*',
    //     element: <ErrorPage></ErrorPage>
    // },
    {
        path: '/',
        element: <MainLayout></MainLayout>,
    }
])

export default router;