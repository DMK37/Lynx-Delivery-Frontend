import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
export default function SignUpButton() {
  const { loginWithRedirect } = useAuth0();
  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };
  return (
    <Button
      onClick={handleSignUp}
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
  );
}
