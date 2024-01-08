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
import { createOrder } from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";

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
              Is Company: <Checkbox
          checked={inquiry?.isCompany}
          color="secondary"
          disabled
          inputProps={{
            'aria-label': 'High Priority',
          }}
        />
            </Typography>
            <Typography margin={1}>
              High Priority: <Checkbox
          checked={inquiry?.highPriority}
          color="secondary"
          disabled
          inputProps={{
            'aria-label': 'High Priority',
          }}
        />
            </Typography>
            <Typography margin={1}>
              Delivery At The Weekend: <Checkbox
          checked={inquiry?.deliveryAtWeekend}
          color="secondary"
          disabled
          inputProps={{
            'aria-label': 'High Priority',
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

function OfferCell({ params, offers }) {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const handleClickOpen = async () => {
    const off = offers.find((offer) => offer.id === params.row.id);
    console.log(off);
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
        <Typography>Details</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography margin={1}>Offer Id: {offer?.id}</Typography>
            <Typography margin={1}>
              Creation Date: {offer?.creationDate}
            </Typography>
            <Typography margin={1}>Expire Date: {offer?.expireDate}</Typography>
            <Typography margin={1}>Update Date: {offer?.updateDate}</Typography>
            {offer?.reasonOfRejection && (
              <Typography margin={1}>
                Reason Of Rejection: {offer?.reasonOfRejection}
              </Typography>
            )}
            <Typography margin={1}>
              Price: Full Price: {offer?.price.fullPrice}, Base Delivery Price:
              {offer?.price.daseDeliveryPrice}, Weight Fee:{" "}
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

export default function PendingOffersTable({ rows, offers, setOffers }) {
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
      renderCell: (params) => <OfferCell params={params} offers={offers} />,
    },
    {
        field: "accept",
        headerName: "Accept",
        sortable: false,
        width: 150,
        align: "center",
        headerAlign: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => <Button
        sx={{
          bgcolor: "secondary.main",
          marginX: "15px",
          paddingX: "15px",
          ":hover": { bgcolor: "secondary.dark" },
        }}
        disableElevation
        onClick={() => handleAccept(params.row.id)}
      >
        <Typography>Accept</Typography>
      </Button>,
      },
  ];
  const { getAccessTokenSilently } = useAuth0();
  async function handleAccept(offerId) {
    const token = await getAccessTokenSilently();
    await createOrder(offerId, token);
    const updatedOffers = offers.filter(offer => offer.id !== offerId);
    setOffers(updatedOffers);
  }

  return (
    <Box margin={5}>
      <DataGrid rows={rows} columns={columns} sx={{ borderRadius: 5 }} />
    </Box>
  );
}
