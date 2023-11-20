import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import UnderlinedTypography from "../underlined-typography";
export default function LoginButton(second) {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  return (
    <Button variant="text" onClick={handleLogin} disableElevation>
      <UnderlinedTypography sx={{ textTransform: "none" }} text="Login" />
    </Button>
  );
}
