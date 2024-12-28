import React, { useState } from "react";
import LoginImg from "../../assets/login.jpg";
import { Button, Container, TextField } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <section
      style={{
        // paddingTop: "50px",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          margin: "0 auto",
        }}
      >
        <div className="main-login">
          <div
            className="login-container"
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
              className="login-left"
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
                src={LoginImg}
                alt="sign-img"
              />
            </div>
            <div
              className="login-right"
              style={{
                justifySelf: "flex-end",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                width: "350px",
              }}
            >
              <div>
                <h1
                  className="login-title"
                  style={{
                    margin: "0px",
                    color: "var(--text-color)",
                  }}
                >
                  Login
                </h1>
              </div>
              <TextField
                style={{
                  color: "white",
                }}
                color="secondary"
                id="filled-basic"
                label="Your email"
                variant="filled"
                margin="normal"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                style={{
                  color: "white",
                }}
                color="secondary"
                id="filled-basic"
                label="Your password"
                variant="filled"
                margin="normal"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "var(--button-bg)",
                  color: "var(--text-color)",
                }}
              >
                Login
              </Button>
              <div>
                <p
                  style={{
                    color: "var(--text-color)",
                  }}
                >
                  haven't account?
                  <Link
                    to={"/sign-up"}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Login;
