import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import NotFound from "../components/error-page/NotFound";
import Login from "../components/login/Login";
import SignUp from "../components/sign-up/SignUp";
import { toast } from "react-toastify";
import ForgetPassword from "../components/ForgetPassword";
import AdminDashboard from "../components/AdminDashboard";
import Dashboard from "../components/Dashboard";
import ProtectRouter from "../routers/ProtectRouters";
import Settings from "../components/Settings";
const notify = () => toast.success("Welcome to the app!");

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home notify={notify} /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "forget-password", element: <ForgetPassword /> },
      {
        path: "dashboard",
        element: (
          <ProtectRouter>
            <Dashboard />
          </ProtectRouter>
        ),
      },
      {
        path: "settings/:id",
        element: (
          <ProtectRouter>
            <Settings />
          </ProtectRouter>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectRouter>
            <AdminDashboard />
          </ProtectRouter>
        ),
      },
      // { path: "about", element: <About /> },
      // { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
