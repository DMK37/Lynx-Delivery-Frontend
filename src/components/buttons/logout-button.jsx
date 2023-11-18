import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      sx={{
        bgcolor: "secondary.main",
        marginX: "15px",
        paddingX: "15px",
        ":hover": { bgcolor: "secondary.dark" },
      }}
      disableElevation
      onClick={handleLogout}
    >
      <Typography
        noWrap
        component="div"
        sx={{
          textTransform: "none",
          color: "primary.main",
          fontSize: 15,
          fontWeight: "bold",
          display: { sm: "block" },
          verticalAlign: "middle",
        }}
      >
        Log Out
      </Typography>
    </Button>
  );
};

export default LogoutButton;
