import { Box, Typography } from "@mui/material";
import InquiriesTable from "../components/inquiries-table";
import { useEffect, useState } from "react";
import { getAllInquries } from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";

export default function AllInquiriesPage() {
  const [rows, setRows] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const inquiries = await getAllInquries(token);
      if (inquiries.error == null) {
        inquiries.response.data.map((i) => {
          i.package =
            i.package.height + "x" + i.package.width + "x" + i.package.length;
          i.sourceAddress = i.sourceAddress.city;
          i.destinationAddress = i.destinationAddress.city;
          return i;
        });
        setRows(inquiries.response.data);
      }
    };
    setValues();
  },[getAccessTokenSilently]);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxWidth="xl"
    >
      <Typography textAlign={"center"} variant="h4" sx={{ margin: "20px" }}>
        All Inquiries
      </Typography>
      <InquiriesTable rows={rows} />
    </Box>
  );
}
