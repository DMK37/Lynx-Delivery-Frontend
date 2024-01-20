import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import LoginButton from "./login-button";
import SignUpButton from "./sign-up-button";
import LogoutButton from "./logout-button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/profile-circle.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";

export const CourierBarButtons = () => {
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
            <MenuItem onClick={() => navigate("/all-orders")}>Orders</MenuItem>
          </Menu>
          <Box width="25px" />
          <LogoutButton />
        </>
      )}
    </Box>
  );
};
