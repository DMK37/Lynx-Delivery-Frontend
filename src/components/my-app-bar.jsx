import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import SvgIcon from "@mui/material/SvgIcon";
import UnderlinedTypography from "./underlined-typography";
import { NavBarButtons } from "./buttons/nav-bar-buttons";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

export default function MyAppBar() {
  const pages = ["Create Inquiry"];
  const trigger = useScrollTrigger();
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          color="primary"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "grey.400" }}
        >
          <Toolbar>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
            >
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
              <Link component={RouterLink} to="/create-inquiry">
                <UnderlinedTypography text={pages[0]} />
              </Link>
            </Box>
            <NavBarButtons />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}
