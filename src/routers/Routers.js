import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import NotFound from "../components/error-page/NotFound";
import Login from "../components/login/Login";
import SignUp from "../components/sign-up/SignUp";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      // { path: "about", element: <About /> },
      // { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
