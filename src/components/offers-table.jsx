import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

function InquiryCell(params) {
  const [open, setOpen] = useState(false);
  const [inquiry, setInquiry] = useState(null);

  const handleClickOpen = async () => {
    setInquiry(params.row.inquiry); // Store the fetched inquiry in the state
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const status = {
    0: "Created",
    1: "Accepted"
  };

  return (
    <div>
      <Button
        sx={{
          bgcolor: "secondary.main",
          marginX: "15px",
          paddingX: "15px",
          ":hover": { bgcolor: "secondary.dark" },
        }}
        disableElevation
        onClick={handleClickOpen}
      >
        <Typography>Inquiry Details</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inquiry Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Display the specific information for this inquiry here */}
            <Typography margin={1}>Inquiry Id: {inquiry?.id}</Typography>
            <Typography margin={1}>
              Source Address: {inquiry?.sourceAddress?.city},{" "}
              {inquiry?.sourceAddress?.street},{" "}
              {inquiry?.sourceAddress?.houseNumber},{" "}
              {inquiry?.sourceAddress?.apartmentNumber}
            </Typography>
            <Typography margin={1}>
              Destination Address: {inquiry?.destinationAddress?.city},{" "}
              {inquiry?.destinationAddress?.street},{" "}
              {inquiry?.destinationAddress?.houseNumber},{" "}
              {inquiry?.destinationAddress?.apartmentNumber}
            </Typography>
            <Typography margin={1}>
              Date of Inquiring: {inquiry?.dateOfInquiring}
            </Typography>
            <Typography margin={1}>
              Pickup Date: {inquiry?.pickupDate}
            </Typography>
            <Typography margin={1}>
              Delivery Date: {inquiry?.deliveryDate}
            </Typography>
            <Typography margin={1}>
              Height: {inquiry?.package?.height}, Width:
              {inquiry?.package?.width}, Length:{inquiry?.package?.length},
              Weight:{inquiry?.package?.weight}
            </Typography>
            <Typography margin={1}>
              Delivery Date: {inquiry?.deliveryDate}
            </Typography>
            <Typography margin={1}>
              Is Company: {inquiry?.isCompany ? "Yes" : "No"}
            </Typography>
            <Typography margin={1}>
              High Priority: {inquiry?.highPriority ? "Yes" : "No"}
            </Typography>
            <Typography margin={1}>
              Delivery At The Weekend:{" "}
              {inquiry?.deliveryAtWeekend ? "Yes" : "No"}
            </Typography>
            <Typography margin={1}>Status: {status[inquiry?.status]}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function OffersTable({ rows, offers }) {
  const columns = [
    {
      field: "id",
      headerName: "Id",
      //width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "inquiry",
      headerName: "Inquiry",
      width: 250,
      sorttable: false,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <InquiryCell {...params} />,
    },
    {
      field: "price",
      headerName: "Price",
      //width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      //width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullDetails",
      headerName: "Full Details",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params);
        };

        return (
          <Button
            sx={{
              bgcolor: "secondary.main",
              marginX: "15px",
              paddingX: "15px",
              ":hover": { bgcolor: "secondary.dark" },
            }}
            disableElevation
            onClick={onClick}
          >
            <Typography>Details</Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <DataGrid rows={rows} columns={columns} sx={{ borderRadius: 5 }} />
    </div>
  );
}
