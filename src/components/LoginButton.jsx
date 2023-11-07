import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import UnderlinedTypography from "./UnderlinedTypography";
export default function LoginButton(second) {
    const {loginWithRedirect} = useAuth0();
  return (
    <Button
      variant="text"
      onClick={() => loginWithRedirect()}
      sx={{
        paddingX: "15px",
      }}
      disableElevation
    >
      <UnderlinedTypography sx={{ textTransform: "none" }} text="Login" />
    </Button>
  );
}
