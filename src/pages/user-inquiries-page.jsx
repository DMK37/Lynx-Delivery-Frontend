import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/LynxLogo.svg";
import { useAuth0 } from "@auth0/auth0-react";

function createData(id, parcel, sourceAddress, destinationAddress, dateOfInquiring, Status, OfferLink) {
    return {
      id,
      parcel,
      sourceAddress,
      destinationAddress,
      dateOfInquiring,
      Status,
      OfferLink
    };
  }

  const rows = [
    // createData(...)
    // createData(...)
    // createData(...)
  ]

export default function MainPage() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Box
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
      
    </Box>
  );
}