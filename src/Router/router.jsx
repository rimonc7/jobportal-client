import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login"
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoutes from "./PrivateRoutes";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import JobApply from "../pages/JobApply/JobApply";
import MyApplication from "../pages/MyApplication/MyApplication";
import ViewApplication from "../pages/ViewApplication/ViewApplication";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/job/:id",
                element: <PrivateRoutes><JobDetails></JobDetails></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://job-portal-server-alpha-seven.vercel.app/jobs/${params.id}`)
            },
            {
                path: '/jobApply/:id',
                element: <PrivateRoutes><JobApply></JobApply></PrivateRoutes>
            },
            {
                path: "/myPostedJob",
                element: <PrivateRoutes> <MyPostedJobs></MyPostedJobs> </PrivateRoutes>,
            },
            {
                path: '/myApplication',
                element: <PrivateRoutes><MyApplication></MyApplication></PrivateRoutes>,

            },
            {
                path: '/viewApplication/:id',
                element: <PrivateRoutes> <ViewApplication></ViewApplication> </PrivateRoutes>,
                loader: ({params})=> fetch(`https://job-portal-server-alpha-seven.vercel.app/job-applications/jobs/${params.id}`)
            },
            {
                path: "/addJob",
                element: <AddJob></AddJob>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
]);

export default router;