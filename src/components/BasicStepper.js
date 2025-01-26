import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputBox from "./mini-components/InputBox";

function BasicStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const userData = useSelector((state) => state.loginReducer);
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  const user = userDetails.find((item) => item.id === userData?.user?.id) || {};

  const [userFormDetails, setUserFormDetails] = useState({
    name: user.name,
    email: user.email,
    age: "",
    phone: "",
    userFiles: [],
  });

  const navigate = useNavigate();

  const imgs = userFormDetails?.userFiles;

  const steps = ["Personal Information", "Attachments", "Review and Submit"];

  const validateForm = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!userFormDetails.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (
        !userFormDetails.email.trim() ||
        !/\S+@\S+\.\S+/.test(userFormDetails.email)
      ) {
        newErrors.email = "Valid email is required";
      }

      if (
        !userFormDetails.age ||
        +userFormDetails.age < 18 ||
        +userFormDetails.age > 60
      ) {
        newErrors.age = "Please enter age between 18-60";
      }

      if (!userFormDetails.phone || userFormDetails.phone.length !== 10) {
        newErrors.phone = "Please enter mobile number (10 digit).";
      }
    }

    if (activeStep === 1) {
      if (userFormDetails.userFiles.length === 0) {
        newErrors.userFiles = "User must upload the attachements.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name) => (e) => {
    setUserFormDetails((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      const { userFiles, age, phone } = userFormDetails;
      if (activeStep === steps.length - 1) {
        // this is for not move another step.
        setActiveStep(2);
        const updatedUserDetails = userDetails.map((person) =>
          person.id === user.id
            ? {
                ...user,
                age,
                phone,
                profile: {
                  userAttachments: userFiles,
                },
                account: {
                  account: "created",
                  accountStatus: "Submited to branch employee.",
                  balance: 0,
                  approve: "pending",
                },
              }
            : person
        );
        localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
        navigate(`/settings/${user.id}`);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    // stepper
    <div className="container mx-auto px-3 mt-2 md:px-1">
      <div className="mt-8">
        <h1 className="text-[var(--heading-color)] font-bold text-2xl md:text-3xl">
          Create an account
        </h1>
        {/* steps count here */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            my: "20px",
          }}
        >
          {steps.map((index) => (
            <Step
              key={index}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "var(--section-bg)",
                },
                "& .MuiStepIcon-root": {
                  color: "var(--heading-color) !important",
                },
                "& .Mui-completed": {
                  color: "var(--completed-color)",
                },
              }}
            >
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        <h2 className="text-[var(--heading-color)] font-bold ">
          {activeStep === steps.length - 1
            ? `All step's are the finished check that and verify..`
            : ` Step ${activeStep + 1} - ${steps[activeStep]}`}
        </h2>
        {/* steps here */}
        {activeStep === 0 && (
          <>
            <div>
              <InputBox
                lable={"Name"}
                type={"text"}
                error={!!errors.name}
                errorMsg={errors.name}
                value={userFormDetails.name}
                fun={handleInputChange("name")}
              />
              <InputBox
                lable={"Email"}
                type={"email"}
                error={!!errors.email}
                errorMsg={errors.email}
                value={userFormDetails.email}
                fun={handleInputChange("email")}
              />

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <InputBox
                  lable={"Age"}
                  type={"number"}
                  error={!!errors.age}
                  errorMsg={errors.age}
                  value={userFormDetails.age}
                  fun={handleInputChange("age")}
                />

                <InputBox
                  lable={"Phone"}
                  type={"number"}
                  error={!!errors.phone}
                  errorMsg={errors.phone}
                  value={userFormDetails.phone}
                  fun={handleInputChange("phone")}
                />
              </div>
            </div>
          </>
        )}
        {activeStep === 1 && (
          <div>
            <h1 className="text-2xl my-3 text-[var(--text-color)] font-bold md:text-3xl">
              Upload your attachments & proof's
            </h1>

            <div className="flex flex-wrap gap-4">
              <input
                type="file"
                accept=".jpg,.png,.jpeg"
                multiple
                className="w-full p-3 text-sm text-[var(--heading-color)] border-2 border-[var(--border)] rounded-lg bg-[var(--input-color)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--heading-color)] file:text-white hover:file:bg-opacity-80"
                onChange={(e) => {
                  // first create an array of files
                  const files = Array.from(e.target.files);
                  // second the loof of array and set files
                  const updatedFiles = files.map((file) => ({
                    // name of file
                    name: file.name,
                    // url of file
                    url: URL.createObjectURL(file),
                  }));
                  // finally set the form in user uploaded files
                  // using destucture.
                  setUserFormDetails((prev) => ({
                    ...prev,
                    // like this
                    userFiles: updatedFiles,
                  }));
                }}
              />

              <div className="mt-4 border-[var(--border)] rounded">
                <h1 className="mb-4 font-bold text-2xl text-[var(--text-color)] md:text-3xl">
                  Your attachenmts here!
                </h1>

                <div className="flex gap-4 flex-wrap">
                  {imgs && imgs.length > 0 ? (
                    imgs.map((item, index) => (
                      <div className="relative" key={index}>
                        <img
                          src={item.url}
                          alt={item.name}
                          className="h-[150px] w-[150px] rounded-2xl object-cover"
                        />
                        <div
                          className="absolute top-2 right-3 text-gray-950 rounded-[50%] h-[40px] w-[40px] font-bold flex justify-center items-center text-1xl bg-slate-600 cursor-pointer"
                          onClick={() => {
                            // first filter the from the what needed to delete
                            const updatedImgs = imgs.filter(
                              // i !== index
                              // create new array.
                              (_, i) => i !== index
                            );

                            // set the form details
                            setUserFormDetails((prev) => ({
                              ...prev,
                              userFiles: updatedImgs,
                            }));
                          }}
                        >
                          ❌
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-[var(--text-color)] mt-4 text-2xl md:text-3xl">
                      No attachment's yet!
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <h1 className="text-2xl font-bold my-4 text-[var(--text-color)] md:text-3xl">
              Finally verify your detail's
            </h1>
            <div className="mt-4">
              <InputBox
                lable={"Name"}
                disabled={true}
                value={userFormDetails.name}
                type={"text"}
              />
              <InputBox
                lable={"Email"}
                disabled={true}
                value={userFormDetails.email}
                type={"text"}
              />
              <InputBox
                lable={"Phone"}
                disabled={true}
                value={userFormDetails.phone}
                type={"text"}
              />
              <InputBox
                lable={"Age"}
                disabled={true}
                value={userFormDetails.age}
                type={"text"}
              />
              <div className="mt-5 border flex gap-3 flex-wrap border-[var(--border)] p-3">
                {userFormDetails.userFiles.map((item) => (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-28 h-28 rounded-md border border-[var(--border)]"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* controller here */}
        <div className="flex justify-around items-center mt-5">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "gray",
              color: "var(--text-color)",
            }}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--button-bg)",
              color: "var(--text-color)",
            }}
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish and reviwe" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BasicStepper;
