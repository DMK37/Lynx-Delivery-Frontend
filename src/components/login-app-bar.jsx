import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import SvgIcon from "@mui/material/SvgIcon";

export default function LoginAppBar() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
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
            display: "block",
            verticalAlign: "middle",
            marginRight: "15px",
            marginLeft: "5px",
          }}
        >
          LynxDelivery
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
