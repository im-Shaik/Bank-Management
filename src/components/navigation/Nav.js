import React, { useEffect, useRef, useState } from "react";
// style sheet
import "./Nav.css";

import { NavLink } from "react-router-dom";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Container } from "@mui/material";
import { throttle } from "lodash";

function Nav() {
  const [isActiveMobileNav, setActiveMobileNav] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const navbarRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    // Get the saved theme from localStorage or default to "light"
    return localStorage.getItem("theme") || "light";
  });

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  // Update `data-theme` on the <html> element whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save the theme to localStorage
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
    }, 100); // Throttle to run at most every 100ms

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

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
    >
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
            onClick={() => setActiveMobileNav((prev) => !prev)}
          >
            {isActiveMobileNav ? (
              <CgClose size={25} color="var(--text-color)" cursor={"pointer"} />
            ) : (
              <CgMenuLeft
                size={25}
                color="var(--text-color)"
                cursor={"pointer"}
              />
            )}
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
        </div>
      </Container>
    </div>
  );
}

export default Nav;
