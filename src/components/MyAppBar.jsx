import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import SvgIcon from "@mui/material/SvgIcon";
import UnderlinedTypography from "./UnderlinedTypography";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

export default function MyAppBar() {
  const { isAuthenticated, isLoading } = useAuth0();
  const pages = ["Create Inquiry"];
  if (isLoading) {
    return <div></div>;
  }
  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "grey.400" }}
    >
      <Toolbar>
        <Link component={RouterLink} to="/" underline="none" color="inherit">
          <SvgIcon sx={{ fontSize: 50, borderRadius: "30%" }}>
            <Logo />
          </SvgIcon>
        </Link>
        <Typography
          noWrap
          component="div"
          sx={{
            fontSize: 23,
            fontWeight: "bold",
            display: { xs: "none", sm: "block" },
            verticalAlign: "middle",
            marginRight: "15px",
            marginLeft: "5px",
          }}
        >
          LynxDelivery
        </Typography>

        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Link component={RouterLink} to="/inquiry">
            <UnderlinedTypography text={pages[0]} />
          </Link>
        </Box>
        <Box sx={{ marginLeft: "auto", display: "flex" }}>
          {!isAuthenticated && <LoginButton />}
          {!isAuthenticated && <SignUpButton />}
          {isAuthenticated && <LogoutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
