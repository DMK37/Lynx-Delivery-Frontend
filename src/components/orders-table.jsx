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
import { getAllOrders, patchOrder } from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";
import MyTextField from "./my-text-field";

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
            <Typography margin={1}>Offer Id: {offer?.id}</Typography>
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

export default function OrdersTable() {
  const { getAccessTokenSilently } = useAuth0();

  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const orders = await getAllOrders(token);
      if (orders.error == null) {
        setRows(orders.response.data);
      }
      setLoading(false);
    };
    setValues();
  }, [getAccessTokenSilently, refresh]);

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
    {
      field: "pickedUp",
      headerName: "Picked Up",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        if (params.row.orderStatus < 1) {
          return (
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
                patchOrder(params.row.id, 1, null, "courier 1", token);
                setRefresh(!refresh);
                setLoading(true);
              }}
            >
              <Typography>Picked Up</Typography>
            </Button>
          );
        }
      },
    },
    {
      field: "cannotDeliver",
      headerName: "Cannot Deliver",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        if (params.row.orderStatus < 2) {
          return (
            <Button
              sx={{
                bgcolor: "secondary.main",
                marginX: "15px",
                paddingX: "15px",
                ":hover": { bgcolor: "secondary.dark" },
              }}
              disableElevation
              onClick={() => {
                setOrder(params.row);
                setOpen(true);
              }}
            >
              <Typography>Cannot Deliver</Typography>
            </Button>
          );
        }
      },
    },
    {
      field: "delivered",
      headerName: "Delivered",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        if (params.row.orderStatus < 2) {
          return (
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
                await patchOrder(params.row.id, 3, null, "courier 1", token);
                setRefresh(!refresh);
                setLoading(true);
              }}
            >
              <Typography>Delivered</Typography>
            </Button>
          );
        }
      },
    },
  ];

  return (
    <Box margin={5}>
      <DataGrid rows={rows} columns={columns} sx={{ borderRadius: 5 }} />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setMessage("");
          setOrder(null);
        }}
      >
        <DialogTitle>Cannot Deliver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MyTextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              label="Message"
              isRequired={true}
            ></MyTextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            sx={{
              //width: 250,
              marginY: 3,
              paddingX: 4,
              ":hover": { backgroundColor: "third.pinktext" },
              textTransform: "none",
            }}
            disableElevation
            variant="contained"
            onClick={async () => {
              const token = await getAccessTokenSilently();
              patchOrder(order.id, 2, message, "courier 1", token);
              setRefresh(!refresh);
              setLoading(true);
              setOpen(false);
              setMessage("");
              setOrder(null);
            }}
          >
            <Typography fontWeight="bold" color="primary.main">
              Submit
            </Typography>
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setOpen(false);
              setMessage("");
              setOrder(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
