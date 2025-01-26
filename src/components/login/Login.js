import React, { useState, useEffect } from "react";
import LoginImg from "../../assets/login.jpg";
import { Button } from "@mui/material";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action/userAction";
import { clearDuplicateForEmail } from "../../store/action/duplicateAction";
import InputBox from "../mini-components/InputBox";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const duplicateEmail = useSelector(
    (state) => state.duplicates?.duplicateEmail
  );

  useEffect(() => {
    if (duplicateEmail) {
      setEmail(duplicateEmail);
    }
  }, [duplicateEmail]);

  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Validate the form
  const validateForm = () => email.trim().toLowerCase() && password.trim();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(!validateForm());
  };

  const validate = (person) => {
    const newErrors = {};
    if (!person) {
      newErrors.email = "Incorrect email address";
    }

    if (person?.password !== password) {
      newErrors.password = "Incorrect user password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    const user = userDetails.find(
      (item) => item.email === email.trim().toLowerCase()
    );

    if (validate(user)) {
      toast.success("User logged in successfully");

      // Dispatch login action and clear duplicate email if necessary
      dispatch(login(user));
      if (duplicateEmail) dispatch(clearDuplicateForEmail());

      if (user.role === "admin") {
        navigate(`/admin-dashboard`);
      } else {
        navigate("/dashboard");
      }
    }
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
        <div className="main-login">
          <div
            className="login-container w-full md:w-[76%]"
            style={{
              backgroundColor: "var(--section-bg)",
              borderRadius: "2rem",
              height: "fit-content",
              // width: "70%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
            }}
          >
            {/* Left Section */}
            <div
              className="login-left"
              style={{ height: "100%", width: "100%" }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "2rem 0 0 2rem",
                }}
                src={LoginImg}
                alt="login"
              />
            </div>

            {/* Right Section */}
            <div
              className="login-right"
              style={{
                justifySelf: "center",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                width: "350px",
              }}
            >
              <h1
                className="login-title text-[var(--section-bg)] font-bold text-2xl md:text-3xl"
                style={{ margin: "0px", color: "var(--text-color)" }}
              >
                Login
              </h1>

              {/* Email Field */}

              <InputBox
                lable={"Email"}
                type={"email"}
                fun={handleInputChange(setEmail)}
                value={email}
                error={!!errors.email}
                errorMsg={errors.email}
              />

              {/* Password Field */}
              <InputBox
                lable={"Password"}
                type={"password"}
                fun={handleInputChange(setPassword)}
                value={password}
                error={!!errors.password}
                errorMsg={errors.password}
              />

              {/* Login Button */}
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: error ? "gray" : "var(--button-bg)",
                  color: "var(--text-color)",
                }}
                disabled={error}
                onClick={handleLogin}
              >
                Login
              </Button>

              <div className="mt-4 flex flex-col gap-3">
                <p style={{ color: "var(--text-color)" }}>
                  Haven't an account?
                  <Link
                    to="/sign-up"
                    style={{
                      color: "var(--text-color)",
                      marginLeft: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Sign-UP here!
                  </Link>
                </p>

                <p>
                  <Link
                    to="/forget-password"
                    className="text-[var(--text-color)] hover:text-[var(--heading-color)] text-[16px]"
                  >
                    Forget your password?
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

export default Login;
