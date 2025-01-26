import React from "react";
import { Container } from "@mui/material";
import BasicStepper from "./BasicStepper";
import { useSelector } from "react-redux";

function Dashboard() {
  const data = useSelector((state) => state.loginReducer);
  const user = data?.user;

  const userDetail = JSON.parse(localStorage.getItem("userDetails")).find(
    (item) => item.id === user?.id
  );

  console.log(userDetail);

  return (
    <Container>
      {!userDetail.account?.account ? <BasicStepper /> : <h1>Hello</h1>}
    </Container>
  );
}

export default Dashboard;
