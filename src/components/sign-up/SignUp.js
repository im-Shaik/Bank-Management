import React, { useState } from "react";
import SignUpImg from "../../assets/sign-up.jpg";
import { Button, Container, TextField } from "@mui/material";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <section
      style={{
        paddingTop: "20px",
        height: "100%",
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
                justifySelf: "flex-end",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                width: "350px",
              }}
            >
              <div>
                <h1
                  className="sign-up-title"
                  style={{
                    margin: "0px",
                    color: "var(--text-color)",
                  }}
                >
                  Sign-Up
                </h1>
              </div>
              <TextField
                style={{
                  color: "white",
                }}
                color="secondary"
                id="filled-basic"
                label="Your name"
                variant="filled"
                margin="normal"
                value={name}
                type="name"
                onChange={(e) => setName(e.target.value)}
              />
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
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SignUp;
