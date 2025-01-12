import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/splide/css";

// or other themes
import "@splidejs/splide/css/skyblue";
import "@splidejs/splide/css/sea-green";

// or only core styles
import "@splidejs/splide/css/core";
import { Button } from "@mui/material";

import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <Splide
      options={{
        rewind: true,
        // gap: "1rem",
        autoPlay: true,
      }}
      aria-label="My Favorite Images"
    >
      {[
        {
          img: "https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          content: "Your wallet has been safe.",
          bannerButton: { label: "Create account", link: "/sign-up" },
        },
        {
          img: "https://images.unsplash.com/photo-1725458894508-4fb8bed9a21f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
          content: "Your amount has been safe.",
          bannerButton: { label: "Services", link: "/services" },
        },
        {
          img: "https://images.unsplash.com/photo-1725714834773-b5f278346915?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
          content: "Your account has been safe.",
          bannerButton: { label: "Login", link: "/login" },
        },
      ].map((prop) => (
        <SplideSlide>
          <div
            className="splide-img"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundSize: "cover",
            }}
          >
            <img
              style={{
                zIndex: "-1",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={prop.img}
              alt="i-1"
            />
            <h1
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "gray",
                zIndex: "1",
              }}
            >
              {prop.content}
            </h1>
            <div>
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  bottom: "70px",
                  left: "50%",
                  transform: "translate(-50%)",
                  fontSize: "1rem",
                }}
              >
                <Link to={prop?.bannerButton?.link}>
                  {prop?.bannerButton?.label}
                </Link>
              </Button>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
export default Banner;
