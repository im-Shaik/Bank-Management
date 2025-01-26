import React from "react";
import { useParams } from "react-router-dom";

function Settings() {
  const { id } = useParams();
  return <div className="container mx-auto "></div>;
}

export default Settings;
