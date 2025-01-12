import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [msg, setErrorMsg] = useState("Enter your email");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [appear, setAppear] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const duplicateEmail = useSelector(
    (state) => state.duplicates?.duplicateEmail
  );

  useEffect(() => {
    if (duplicateEmail) {
      setUserEmail(duplicateEmail.trim().toLowerCase());
    }
  }, [duplicateEmail]);

  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  const handleForgetPassword = () => {
    setIsLoading(true);
    const selectedUser = userDetails.find((item) => item.email === userEmail);

    if (selectedUser) {
      const updatedUserDetails = userDetails.map((user) =>
        user.id === selectedUser.id ? { ...user, password: userPassword } : user
      );

      localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Password updated successfully!");
        navigate("/login");

        // Reset state
        setUserEmail("");
        setUserPassword("");
        setAppear(false);
        setErrorMsg("Enter your email");
      }, 2000); // Simulate delay for loading effect
    } else {
      setIsLoading(false); // Stop loading if no user is found
      toast.error("No user found with this email.");
    }
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value.trim().toLowerCase();
    setUserEmail(emailInput);

    const foundUser = userDetails.find((item) => item.email === emailInput);

    if (emailInput === "") {
      setErrorMsg("Email shouldn't be empty");
      setAppear(false);
    } else if (!foundUser) {
      setErrorMsg("Sorry, can't find this email");
      setAppear(false);
    } else {
      setErrorMsg("Email verified, you can update your password.");
      setAppear(true);
      setUserPassword(""); // Reset the password field
    }
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <Container>
      <div className="py-[40px] px-[15px] md:p-[50px]">
        <h1 className="text-2xl font-bold mb-5 text-left md:text-4xl text-[var(--text-color)]">
          Forget your password
        </h1>
        <div className="md:grid md:place-items-center md:justify-center md:gap-4 md:grid-cols-2">
          <div className="h-[350px] hidden md:block">
            <img
              className="object-cover h-full w-full"
              src="https://images.unsplash.com/photo-1650769084921-ee3a6ea9fa4d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="forget-img"
            />
          </div>

          <div className="pt-5 w-full md:w-auto transition-all">
            <h1 className="mb-5 text-2px font-bold text-[var(--text-color)] md:text-3xl">
              Type your email here!
            </h1>
            <TextField
              fullWidth
              color="secondary"
              label={msg}
              variant="filled"
              margin="normal"
              onChange={handleEmailChange}
              value={userEmail}
            />
            {appear && (
              <TextField
                fullWidth
                color="secondary"
                label="New Password"
                variant="filled"
                margin="normal"
                type={checked ? "text" : "password"}
                value={userPassword}
                onChange={handlePasswordChange}
              />
            )}
            <div className="flex gap-3 items-center">
              <Button
                variant="contained"
                style={{
                  borderRadius: "13px",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: appear ? "var(--button-bg)" : "gray",
                  color: "var(--text-color)",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  textTransform: "capitalize",
                }}
                onClick={appear && !isLoading ? handleForgetPassword : null}
                disabled={!appear || !userPassword || isLoading}
              >
                {isLoading ? "Loading..." : appear ? "Update Password" : "Next"}
              </Button>

              {appear && (
                <div>
                  <input
                    type="checkbox"
                    className="accent-[var(--section-bg)]"
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                  />
                  <label
                    style={{
                      marginLeft: "8px",
                      color: "var(--text-color)",
                    }}
                  >
                    Show Password
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ForgetPassword;
