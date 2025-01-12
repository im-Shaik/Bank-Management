import React, { useEffect, useRef, useState } from "react";
// style sheet
import "./Nav.css";

import { NavLink } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Container } from "@mui/material";
import { throttle } from "lodash";
import BackgroundLetterAvatars from "../mini-components/BackgroundLetterAvatars";
import { useSelector } from "react-redux";

function Nav() {
  const [isActiveMobileNav, setActiveMobileNav] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const overlayRef = useRef(null);
  const navbarRef = useRef(null);
  const linksRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    // Get the saved theme from localStorage or default to "light"
    return localStorage.getItem("theme") || "light";
  });

  const [user, setUser] = useState(null);
  const userAuthenticate = useSelector((state) => state.loginReducer);
  const isAuthenticated = userAuthenticate?.isAuthenticated;

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "Sign-up", path: "/sign-up" },
    { label: "Dashborad", path: "/dashboard" },
    { label: "Services", path: "/service" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const childrenArray = Array.from(linksRef.current.children);
    if (childrenArray) {
      childrenArray.forEach((child) => {
        child.addEventListener("click", () => {
          setActiveMobileNav(false);
          setVisibleOverlay(false);
        });
      });
    }
  }, []);

  // Update `data-theme` on the <html> element whenever the theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (navbarRef.current) {
        if (window.pageYOffset >= 150) {
          navbarRef.current.classList.add("sticky");
        } else {
          navbarRef.current.classList.remove("sticky");
        }
      }
    }, 100);

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  // for overlay
  useEffect(() => {
    const overLayElem = overlayRef.current;

    if (overLayElem) {
      overLayElem.addEventListener("click", () => {
        setVisibleOverlay(false);
        setActiveMobileNav(false);
      });
    }
  }, []);

  // for user
  useEffect(() => {
    if (isAuthenticated) {
      setUser(userAuthenticate);
    } else {
      setUser(null);
    }
  }, [isAuthenticated, userAuthenticate]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      ref={navbarRef}
      style={{
        backgroundColor: "var(--section-bg)",
        transition: "all 0.6s",
      }}
      className="p-3"
    >
      <div
        ref={overlayRef}
        className="overlay"
        style={{
          visibility: visibleOverlay ? "visible" : "hidden",
        }}
      ></div>
      <Container
        style={{
          margin: "0 auto",
        }}
      >
        <div className="nav-content">
          {/* logo here */}
          <div className="logo">
            <h1>Bank_.</h1>
          </div>

          {/* NavLinks here */}
          <div
            className="burger"
            style={{
              cursor: "pointer",
              justifySelf: "flex-end",
            }}
            onClick={() => {
              setActiveMobileNav((prev) => !prev);
              setVisibleOverlay((prev) => !prev);
            }}
          >
            <CgMenuLeft
              size={25}
              color="var(--text-color)"
              cursor={"pointer"}
            />
          </div>
          {/* desktop nav */}
          <div
            className="desktop-nav-links"
            style={{
              justifySelf: "flex-end",
            }}
          >
            {links.map((link) => (
              <NavLink
                className="nav-link"
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? "purple" : "var(--text-color)",
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* mobile nav */}
          <div
            className="mobile-nav-links"
            style={{
              transform: isActiveMobileNav ? "" : "translateY(100%)",
              borderRadius: isActiveMobileNav ? "20px 20px 0 0" : "",
            }}
            ref={linksRef}
          >
            {links.map((link) => (
              <NavLink
                className="nav-link"
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? "purple" : "var(--text-color)",
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <div
              onClick={() => {
                toggleTheme();
                setDarkMode((prev) => !prev);
              }}
            >
              {isDarkMode ? (
                <MdDarkMode
                  size={25}
                  color="var(--text-color)"
                  cursor={"pointer"}
                />
              ) : (
                <MdLightMode
                  size={25}
                  color="var(--text-color)"
                  cursor={"pointer"}
                />
              )}
            </div>
            <div>{user ? <BackgroundLetterAvatars /> : <></>}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Nav;
