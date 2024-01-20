import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getPendingOffers } from "../api/backendService";
import PendingOffersTable from "../components/pending-offers-table";
import { CircularProgress } from '@mui/material';

export default function PendingOffersPage() {
  const [rows, setRows] = useState([]);
  const [offers, setOffers] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Status = {
      0: "Offered",
      1: "Pending",
      2: "Accepted",
      3: "Rejected",
    };
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const offers = await getPendingOffers(token);
      if (offers.error == null) {
        setOffers(offers.response.data);
        const offersCopy = JSON.parse(JSON.stringify(offers.response.data));
        offersCopy.map((o) => {
          o.price = o.price.fullPrice + " PLN";
          o.status = Status[o.status];
          return o;
        });
        setRows(offersCopy);
      }
      setLoading(false);
    };
    setValues();
  }, [getAccessTokenSilently]);

  if (loading) { // Add this block
    return <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress color="secondary" />
  </Box>;
  }

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
      <PendingOffersTable rows={rows} offers={offers} setOffers={setOffers} />
    </Box>
  );
}
