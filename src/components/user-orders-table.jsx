import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getUserOrders } from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";


function OfferCell({ params, orders }) {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const [creationDate, setCreationDate] = useState(null);
  const [expireDate, setExpireDate] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const handleClickOpen = async () => {
    const ord = orders.find((order) => order.offerID === params.row.offerID);
    const off = ord.offer;

    setCreationDate(new Date(off.creationDate));
    setExpireDate(new Date(off.expireDate));
    setUpdateDate(new Date(off.updateDate));
    setOffer(off);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
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
        <Typography>Offer Details</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Offer Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography margin={1}>Offer Id: {offer?.offerId}</Typography>
            <Typography margin={1}>
              Creation Date:{" "}
              {creationDate?.getFullYear().toString().padStart(2, "0")}/
              {(creationDate?.getMonth() + 1).toString().padStart(2, "0")}/
              {creationDate?.getDate().toString().padStart(2, "0")}{" "}
              {creationDate?.getHours().toString().padStart(2, "0")}:
              {creationDate?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            <Typography margin={1}>
              Expire Date:{" "}
              {expireDate?.getFullYear().toString().padStart(2, "0")}/
              {(expireDate?.getMonth() + 1).toString().padStart(2, "0")}/
              {expireDate?.getDate().toString().padStart(2, "0")}{" "}
              {expireDate?.getHours().toString().padStart(2, "0")}:
              {expireDate?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            <Typography margin={1}>
              Update Date:{" "}
              {updateDate?.getFullYear().toString().padStart(2, "0")}/
              {(updateDate?.getMonth() + 1).toString().padStart(2, "0")}/
              {updateDate?.getDate().toString().padStart(2, "0")}{" "}
              {updateDate?.getHours().toString().padStart(2, "0")}:
              {updateDate?.getMinutes().toString().padStart(2, "0")}
            </Typography>
            {offer?.reasonOfRejection && (
              <Typography margin={1}>
                Reason Of Rejection: {offer?.reasonOfRejection}
              </Typography>
            )}
            <Typography margin={1}>
              Price: Full Price: {offer?.price.fullPrice}, Base Delivery Price:
              {offer?.price.baseDeliveryPrice}, Weight Fee:{" "}
              {offer?.price.weightFee}, Size Fee: {offer?.price.sizeFee},
              Priority Fee: {offer?.price.priorityFee}, Delivery At Weekend Fee:{" "}
              {offer?.price.deliveryAtWeekendFee}
            </Typography>
            <Typography margin={1}>
              Customer Info: First Name: {offer?.customerInfo?.firstName}, Last
              Name: {offer?.customerInfo?.lastName}, Email:{" "}
              {offer?.customerInfo?.email}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function UserOrdersTable() {
  const { getAccessTokenSilently } = useAuth0();

  
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const orders = await getUserOrders(token);
      if (orders.error == null) {
        setRows(orders.response.data);
      }
      setLoading(false);
    };
    setValues();
  }, [getAccessTokenSilently]);

  const orderStatus = {
    0: "Accepted",
    1: "Picked Up",
    2: "Cannot Deliver",
    3: "Delivered",
  };

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

  const columns = [
    {
      field: "id",
      headerName: "Id",
      //width: 150,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "offer",
      headerName: "Offer Details",
      sortable: false,
      width: 160,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => <OfferCell params={params} orders={rows} />,
    },

    {
      field: "orderStatus",
      headerName: "Order Status",
      align: "center",
      headerAlign: "center",
      width: 150,
      valueGetter: (params) => orderStatus[params.row.orderStatus],
    },

    {
      field: "lastUpdate",
      headerName: "Last Update",
      align: "center",
      headerAlign: "center",
      width: 200,
      valueGetter: (params) => {
        const date = new Date(params.row.lastUpdate);
        return (
          date.getFullYear().toString().padStart(2, "0") +
          "/" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          date.getDate().toString().padStart(2, "0") +
          " " +
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0")
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
