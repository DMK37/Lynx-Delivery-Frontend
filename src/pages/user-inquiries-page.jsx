import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import InquiriesTable from "../components/inquiries-table";
import { useEffect, useState } from "react";
import { getInquries } from "../api/backendService";

export default function UserInquiriesPage() {
  const { isLoading } = useAuth0();
  const { getAccessTokenSilently, user } = useAuth0();
  const [rows, setRows] = useState([]);
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
    };
    setValues();
  }, [getAccessTokenSilently, user.sub]);

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
      <InquiriesTable rows={rows} />
    </Box>
  );
}
