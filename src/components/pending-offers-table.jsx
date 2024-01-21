import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  acceptOffer,
  getPendingOffers,
  rejectOffer,
} from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";
import MyTextField from "./my-text-field";

function InquiryCell(params) {
  const [open, setOpen] = useState(false);
  const [inquiry, setInquiry] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [dateOfInquiring, setDateOfInquiring] = useState(null);

  const handleClickOpen = async () => {
    setInquiry(params.row.inquiry);
    setDateOfInquiring(new Date(params.row.inquiry.dateOfInquiring));
    setPickupDate(new Date(params.row.inquiry.pickupDate));
    setDeliveryDate(new Date(params.row.inquiry.deliveryDate));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const status = {
    0: "Created",
    1: "Accepted",
    2: "Offers Requested",
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

function OfferCell({ params, offers }) {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const [creationDate, setCreationDate] = useState(null);
  const [expireDate, setExpireDate] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const handleClickOpen = async () => {
    const off = offers.find((offer) => offer.offerId === params.row.offerId);
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
        <Typography>Details</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Details</DialogTitle>
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

export default function PendingOffersTable() {
  const { getAccessTokenSilently } = useAuth0();

  const [refresh, setRefresh] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);
  const [agreement, setAgreement] = useState("");
  const [receipt, setReceipt] = useState("");
  const [rejectOpen, rejectSetOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const offers = await getPendingOffers(token);
      if (offers.error == null) {
        setRows(offers.response.data);
      }
      setLoading(false);
    };
    setValues();
  }, [getAccessTokenSilently, refresh]);

  if (loading) {
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
      field: "offerId",
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
      valueGetter: (params) => params.row.price.fullPrice + " PLN",
    },
    {
      field: "fullDetails",
      headerName: "Full Details",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => <OfferCell params={params} offers={rows} />,
    },
    {
      field: "accept",
      headerName: "Accept",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          sx={{
            bgcolor: "secondary.main",
            marginX: "15px",
            paddingX: "15px",
            ":hover": { bgcolor: "secondary.dark" },
          }}
          disableElevation
          onClick={() => {
            setOpen(true);
            setOffer(params.row);
            //handleAccept(params.row.id);
          }}
        >
          <Typography>Accept</Typography>
        </Button>
      ),
    },
    {
      field: "reject",
      headerName: "Reject",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          sx={{
            bgcolor: "secondary.main",
            marginX: "15px",
            paddingX: "15px",
            ":hover": { bgcolor: "secondary.dark" },
          }}
          disableElevation
          onClick={() => {
            rejectSetOpen(true);
            setOffer(params.row);
          }}
        >
          <Typography>Reject</Typography>
        </Button>
      ),
    },
  ];
  async function handleAccept(offerId) {
    if (!agreement || !receipt) {
      return;
    }
  
    const formData = new FormData();
    formData.append('agreement', agreement);
    formData.append('receipt', receipt);

    const token = await getAccessTokenSilently();
    await acceptOffer(offerId, token, formData);
    //const updatedOffers = rows.filter((offer) => offer.offerId !== offerId);
    // console.log(updatedOffers);
    //setRows(updatedOffers);
    setOpen(false);
    setRefresh(!refresh);
    setLoading(true);
  }

  async function handleReject(offerId) {
    const token = await getAccessTokenSilently();
    await rejectOffer(offerId, token, rejectReason);
    setRefresh(!refresh);
    rejectSetOpen(false);
    setLoading(true);
  }

  const handleAgreementChange = (event) => {
    const file = event.target.files[0];
    setAgreement(file);
    // Handle the agreement file here
  };

  const handleReceiptChange = (event) => {
    const file = event.target.files[0];
    setReceipt(file);
    // Handle the receipt file here
  };

  return (
    <Box margin={5}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ borderRadius: 5 }}
        getRowId={(row) => row.offerId}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setOffer(null);
        }}
      >
        <DialogTitle>Accept Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box flexDirection="column" marginBottom={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="agreement-file"
                type="file"
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement-file">
                <Button variant="contained" color="primary" component="span">
                  Upload Agreement
                </Button>
              </label>
              {agreement && <p>Selected agreement: {agreement.name}</p>}
            </Box>

            <Box flexDirection="column" marginBottom={2}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="receipt-file"
                type="file"
                onChange={handleReceiptChange}
              />
              <label htmlFor="receipt-file">
                <Button variant="contained" color="primary" component="span">
                  Upload Receipt
                </Button>
              </label>
              {receipt && <p>Selected receipt: {receipt.name}</p>}
            </Box>
          </DialogContentText>
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
            await handleAccept(offer.offerId);
          }}>
            Accept
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setOpen(false);
              setOffer(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={rejectOpen}
        onClose={() => {
          rejectSetOpen(false);
          setOffer(null);
          setRejectReason("");
        }}
      >
        <DialogTitle>Reject Reason</DialogTitle>
        <DialogContent>
          <MyTextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              // Handle the reject here
              await handleReject(offer.offerId);
              rejectSetOpen(false);
              setOffer(null);
              setRejectReason("");
            }}
            sx={{
              bgcolor: "secondary.main",
              marginX: "15px",
              paddingX: "15px",
              ":hover": { bgcolor: "secondary.dark" },
            }}
            disableElevation
          >
            Reject
          </Button>
          <Button
            onClick={() => {
              rejectSetOpen(false);
              setOffer(null);
              setRejectReason("");
            }}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
