import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Box, Link } from "@mui/material";
import LoginButton from "./login-button";
import SignUpButton from "./sign-up-button";
import LogoutButton from "./logout-button";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/profile-circle.svg";
import SvgIcon from "@mui/material/SvgIcon";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ marginLeft: "auto", display: "flex" }}>
      {!isAuthenticated && (
        <>
          <LoginButton />
          <SignUpButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <Link component={RouterLink} to="/profile" underline="none" color="inherit">
            <SvgIcon sx={{ fontSize: 40, borderRadius: "30%" }}>
              <Logo />
            </SvgIcon>
          </Link>
          <Box width='25px'/>
          <LogoutButton />
        </>
      )}
    </Box>
  );
};
