import { Box, Typography } from "@mui/material";
import PendingOffersTable from "../components/pending-offers-table";


export default function PendingOffersPage() {

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxWidth="xl"
    >
      <Typography textAlign={"center"} variant="h4" sx={{ margin: "20px" }}>
        All Offers
      </Typography>
      <PendingOffersTable/>
    </Box>
  );
}
