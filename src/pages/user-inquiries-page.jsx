import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import InquiriesTable from "../components/inquiries-table";

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

export default function UserInquiriesPage() {
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
      maxWidth="xl"
    >
      <InquiriesTable/>
    </Box>
  );
}