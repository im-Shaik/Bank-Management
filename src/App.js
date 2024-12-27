import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "./routers/Routers";

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
