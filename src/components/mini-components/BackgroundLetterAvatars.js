import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/action/userAction";

export default function BackgroundLetterAvatars() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const users = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = users?.isAuthenticated;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (!name) {
      return {
        sx: {
          bgcolor: stringToColor(" "), // Or any default color
        },
        children: " ", // Or any default initials
      };
    }

    const nameParts = name.split(" ");
    let initials = "";
    if (nameParts.length >= 1) {
      initials += nameParts[0][0];
    }
    if (nameParts.length >= 2) {
      initials += nameParts[1][0];
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setUser(users?.user);
    } else {
      setUser(null);
    }
  }, [isAuthenticated, users]);

  return (
    <div
      style={{
        cursor: "pointer",
      }}
    >
      <Avatar {...stringAvatar(user?.name)} onClick={handleOpenUserMenu} />
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem className=" bg-[var(--main-bg)" onClick={handleLogout}>
          <Typography
            className=" text-[var(--text-color)]]"
            sx={{ textAlign: "center" }}
          >
            Logout
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate(`/settings`)}>
          <Typography sx={{ textAlign: "center" }}>Settings</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
