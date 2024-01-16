import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import OffersTable from "../components/offers-table";
import { getAllOffers } from "../api/backendService";

export default function AllOffersPage() {
  const [rows, setRows] = useState([]);
  const [offers, setOffers] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const Status = {
      0: "Offered",
      1: "Pending",
      2: "Accepted",
      3: "Rejected",
    };
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const offers = await getAllOffers(token);
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
    };
    setValues();
  }, [getAccessTokenSilently]);

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
      <OffersTable rows={rows} offers={offers} />
    </Box>
  );
}
