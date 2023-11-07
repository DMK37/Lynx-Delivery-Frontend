import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
export default function SignUpButton() {
    const {loginWithRedirect} = useAuth0();
    return(
        <Button
            onClick={() => loginWithRedirect({ authorizationParams:{
              screen_hint: 'signup'
            }
              })}
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
    )
}