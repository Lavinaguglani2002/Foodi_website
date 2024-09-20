import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Home/Shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/Home/Shop/CartPage";
import Modal from "../components/Login";
import Users from "../pages/dashboard/admin/Users";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: <Menu />,
            },
            {
                path: "/cart-page",
                element: <CartPage />,
            },
            {
                path: "/update-profile",
                element: <UpdateProfile />,
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Modal />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRouter>
                <DashboardLayout/>
            </PrivateRouter>
        ),
        children: [
            {
                path: "users",
                element: <Users />,
            },
        ],
    },
]);

export default router;
