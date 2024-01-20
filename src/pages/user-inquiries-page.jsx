import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import InquiriesTable from "../components/inquiries-table";
import { useEffect, useState } from "react";
import { getInquries } from "../api/backendService";
import { CircularProgress } from '@mui/material';

export default function UserInquiriesPage() {
  const { isLoading } = useAuth0();
  const { getAccessTokenSilently, user } = useAuth0();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const inquiries = await getInquries(token);
      if (inquiries.error == null) {
        // inquiries.response.data.map((i) => {
        //   i.package =
        //     i.package.height + "x" + i.package.width + "x" + i.package.length;
        //   i.sourceAddress = i.sourceAddress.city;
        //   i.destinationAddress = i.destinationAddress.city;
        //   return i;
        // });
        setRows(inquiries.response.data);
      }
      setLoading(false);
    };
    setValues();
  }, [getAccessTokenSilently, user.sub]);

  if (isLoading) {
    return <div></div>;
  }

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
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxWidth="xl"
    >
      <InquiriesTable rows={rows} />
    </Box>
  );
}
