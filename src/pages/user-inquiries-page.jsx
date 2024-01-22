import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import InquiriesTable from "../components/inquiries-table";
import { useEffect, useState } from "react";
import { addInquiry, getInquries } from "../api/backendService";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MyTextField from "../components/my-text-field";

export default function UserInquiriesPage() {
  const { isLoading } = useAuth0();
  const { getAccessTokenSilently, user } = useAuth0();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
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
  }, [getAccessTokenSilently, user.sub, refresh]);

  if (isLoading) {
    return <div></div>;
  }

  if (loading) {
    // Add this block
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxWidth="xl"
    >
      <Button color="secondary" sx={{ marginLeft: 4, marginTop: 2 }} onClick={handleClickOpen}>
        Add existing inquiry
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Inquiry</DialogTitle>
        <DialogContent>
          <MyTextField
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="number"
            label="Id"
            isRequired={true}
          ></MyTextField>
        </DialogContent>
        <DialogActions>
        <Button
        sx={{
          bgcolor: "secondary.main",
          marginX: "15px",
          paddingX: "15px",
          ":hover": { bgcolor: "secondary.dark" },
        }}
        disableElevation
            onClick={async () => {
              const token = await getAccessTokenSilently();
              await addInquiry(id, token);
              setRefresh(!refresh);
              handleClose();
            }}
          >
            Add
          </Button>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
      <InquiriesTable rows={rows} />
    </Box>
  );
}
