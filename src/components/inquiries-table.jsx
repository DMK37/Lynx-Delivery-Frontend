import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function InquiriesTable({ rows }) {
  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sourceAddress",
      headerName: "Source Address",
      width: 250,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.sourceAddress.city +
        ", " +
        params.row.sourceAddress.street +
        ", " +
        params.row.sourceAddress.houseNumber +
        ", " +
        params.row.sourceAddress.apartmentNumber,
    },
    {
      field: "destinationAddress",
      headerName: "Destination Address",
      width: 250,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) =>
        params.row.destinationAddress.city +
        ", " +
        params.row.destinationAddress.street +
        ", " +
        params.row.destinationAddress.houseNumber +
        ", " +
        params.row.destinationAddress.apartmentNumber,
    },
    {
      field: "highPriority",
      headerName: "High Priority",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.highPriority}
          color="secondary"
          disable
          inputProps={{
            "aria-label": "High Priority",
          }}
        />
      ),
    },
    {
      field: "deliveryAtWeekend",
      headerName: "Delivery At Weekend",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.deliveryAtWeekend}
          color="secondary"
          disable
          inputProps={{
            "aria-label": "Delivery At Weekend",
          }}
        />
      ),
    },
    {
      field: "inquiry",
      headerName: "Full Inquiry",
      width: 250,
      sorttable: false,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <InquiryCell {...params} />,
    },
    {
      field: "orderDetails",
      headerName: "Order Details",
      sortable: false,
      width: 250,
      align: "center",
      disableClickEventBubbling: true,
      headerAlign: "center",
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
            <Typography>Order Details</Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <Box margin={5}>
      <DataGrid rows={rows} columns={columns} sx={{ borderRadius: 5 }} />
    </Box>
  );
}

function InquiryCell(params) {
  const [open, setOpen] = useState(false);
  const [inquiry, setInquiry] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [dateOfInquiring, setDateOfInquiring] = useState(null);

  const handleClickOpen = async () => {
    setInquiry(params.row);
    console.log(params.row);
    setDateOfInquiring(new Date(params.row.dateOfInquiring));
    setPickupDate(new Date(params.row.pickupDate));
    setDeliveryDate(new Date(params.row.deliveryDate));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const status = {
    0: "Created",
    1: "Accepted",
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
            <Typography margin={1}>Inquiry Id: {inquiry?.id}</Typography>
            <Typography margin={1}>
              Source Address: {inquiry?.sourceAddress?.city},{" "}
              {inquiry?.sourceAddress?.street},{" "}
              {inquiry?.sourceAddress?.houseNumber},{" "}
              {inquiry?.sourceAddress?.apartmentNumber},
            </Typography>
            <Typography margin={1}>
              Destination Address: {inquiry?.destinationAddress?.city},{" "}
              {inquiry?.destinationAddress?.street},{" "}
              {inquiry?.destinationAddress?.houseNumber},{" "}
              {inquiry?.destinationAddress?.apartmentNumber}
            </Typography>
            <Typography margin={1}>
              Date of Inquiring:{" "}
              {dateOfInquiring?.getFullYear().toString().padStart(2, "0")}/
              {(dateOfInquiring?.getMonth() + 1).toString().padStart(2, "0")}/
              {dateOfInquiring?.getDate().toString().padStart(2, "0")}{" "}
              {dateOfInquiring?.getHours().toString().padStart(2, "0")}:
              {dateOfInquiring?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            <Typography margin={1}>
              Pickup Date:{" "}
              {pickupDate?.getFullYear().toString().padStart(2, "0")}/
              {(pickupDate?.getMonth() + 1).toString().padStart(2, "0")}/
              {pickupDate?.getDate().toString().padStart(2, "0")}{" "}
              {pickupDate?.getHours().toString().padStart(2, "0")}:
              {pickupDate?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            <Typography margin={1}>
              Delivery Date:{" "}
              {deliveryDate?.getFullYear().toString().padStart(2, "0")}/
              {(deliveryDate?.getMonth() + 1).toString().padStart(2, "0")}/
              {deliveryDate?.getDate().toString().padStart(2, "0")}{" "}
              {deliveryDate?.getHours().toString().padStart(2, "0")}:
              {deliveryDate?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            <Typography margin={1}>
              Height: {inquiry?.package?.height}, Width:
              {inquiry?.package?.width}, Length:{inquiry?.package?.length},
              Weight:{inquiry?.package?.weight}
            </Typography>
            <Typography margin={1}>
              Is Company:{" "}
              <Checkbox
                checked={inquiry?.isCompany}
                color="secondary"
                disabled
                inputProps={{
                  "aria-label": "High Priority",
                }}
              />
            </Typography>
            <Typography margin={1}>
              High Priority:{" "}
              <Checkbox
                checked={inquiry?.highPriority}
                color="secondary"
                disabled
                inputProps={{
                  "aria-label": "High Priority",
                }}
              />
            </Typography>
            <Typography margin={1}>
              Delivery At The Weekend:{" "}
              <Checkbox
                checked={inquiry?.deliveryAtWeekend}
                color="secondary"
                disabled
                inputProps={{
                  "aria-label": "High Priority",
                }}
              />
            </Typography>
            <Typography margin={1}>
              Status: {status[inquiry?.status]}
            </Typography>
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
