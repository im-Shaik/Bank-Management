import React, { useState } from "react";
import SignUpImg from "../../assets/sign-up.jpg";
import { Button } from "@mui/material";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { duplicateForEmail } from "../../store/action/duplicateAction";
import InputBox from "../mini-components/InputBox";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    return name.trim() && email.trim() && password.trim();
  };

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    const userDetails = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: "customer",
      password,
    };

    const data = JSON.parse(localStorage.getItem("userDetails")) || [];

    const isDuplicate = data.some((user) => user.email === userDetails.email);
    if (isDuplicate) {
      dispatch(duplicateForEmail(email));
      toast.info("Your email already exists please login");
      navigate("/login");
      return;
    }

    localStorage.setItem("userDetails", JSON.stringify([...data, userDetails]));
    toast.success("User created successfully!");
    navigate("/login");

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    setError(true);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(!validateForm());
  };

  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container mx-auto">
        <div className="main-sign-up">
          <div
            className="sign-up-container"
            style={{
              backgroundColor: "var(--section-bg)",
              borderRadius: "2rem",
              height: "fit-content",
              width: "70%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
            }}
          >
            <div
              className="sign-up-left"
              style={{
                height: "100%",
                width: "400px",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "2rem 0 0 2rem",
                }}
                src={SignUpImg}
                alt="sign-img"
              />
            </div>
            <div
              className="sign-up-right"
              style={{
                justifySelf: "center",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                width: "350px",
              }}
            >
              <h1
                className="sign-up-title text-[var(--section-bg)] font-bold text-2xl md:text-3xl"
                style={{
                  margin: "0px",
                  color: "var(--text-color)",
                }}
              >
                Sign-Up
              </h1>

              <InputBox
                lable={"Name"}
                value={name}
                fun={handleInputChange(setName)}
                type={"name"}
              />
              <InputBox
                lable={"Email"}
                value={email}
                fun={handleInputChange(setEmail)}
                type={"email"}
              />

              <InputBox
                lable={"Password"}
                value={password}
                fun={handleInputChange(setPassword)}
                type={"password"}
              />
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: error ? "gray" : "var(--button-bg)",
                  color: "var(--text-color)",
                  cursor: error ? "not-allowed" : "pointer",
                }}
                onClick={handleSignUp}
                disabled={error}
              >
                Sign Up
              </Button>
              <div className="mt-4">
                <p
                  style={{
                    color: "var(--text-color)",
                  }}
                >
                  Already have an account?
                  <Link
                    to={"/login"}
                    style={{
                      color: "var(--text-color)",
                      marginLeft: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Login here!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
