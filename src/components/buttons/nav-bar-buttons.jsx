import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box, Link, IconButton, Menu, MenuItem } from "@mui/material";
import LoginButton from "./login-button";
import SignUpButton from "./sign-up-button";
import LogoutButton from "./logout-button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/profile-circle.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginLeft: "auto", display: "flex" }} alignItems="center">
      {!isAuthenticated && (
        <>
          <LoginButton />
          <SignUpButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <Link
            component={RouterLink}
            to="/profile"
            underline="none"
            color="inherit"
          ></Link>

          <IconButton
            aria-label="delete"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="small"
          >
            <SvgIcon sx={{ fontSize: 40, borderRadius: "30%" }}>
              <Logo />
            </SvgIcon>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/inquiries")}>
              Inquiries
            </MenuItem>
            <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
          </Menu>
          <Box width="25px" />
          <LogoutButton />
        </>
      )}
    </Box>
  );
};
