import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./navigation/Nav";

const Layout = () => {
  return (
    <div>
      <Nav /> {/* Navigation bar visible across all routes */}
      <main>
        <Outlet /> {/* Render the current route component */}
      </main>
    </div>
  );
};

export default Layout;
