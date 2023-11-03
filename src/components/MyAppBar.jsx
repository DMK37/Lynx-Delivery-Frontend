import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import SvgIcon from "@mui/material/SvgIcon";
import UnderlinedTypography from "./UnderlinedTypography";

export default function MyAppBar() {
  const pages = ["Create Inquiry"];
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
          <Link component={RouterLink} to="/signin" sx={{ paddingTop: 0.5 }}>
            <UnderlinedTypography text="Login" />
          </Link>

          <Button
            component={RouterLink}
            to="/signup"
            sx={{
              bgcolor: "secondary.main",
              marginX: "15px",
              paddingX: "15px",
              ":hover": { bgcolor: "secondary.dark" },
            }}
            disableElevation
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
              Sign Up
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
