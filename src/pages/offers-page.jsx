import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import { useEffect, useState } from "react";
import MyTextField from "../components/my-text-field";
import {
  createOffers,
  getUserInfo,
  postSelectedOffer,
} from "../api/backendService";
import { useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function OffersPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [offers, setOffers] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const params = useParams();
  useEffect(() => {
    const crtOffers = async () => {
      const offers = await createOffers(params.id);
      setOffers(offers.response.data);
      //localStorage.setItem("offers", JSON.stringify(offers.response.data));
    };
    crtOffers();
  }, [getAccessTokenSilently, params.id]);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginY={5}
    >
      <Stack
        spacing={5}
        sx={{
          bgcolor: "primary.main",
          textAlign: "center",
        }}
        alignItems="center"
        justifyContent="center"
        margin="auto"
      >
        {offers?.map((offer) => {
          return (
            <Box
              sx={{
                maxWidth: "xl",
                border: "1px solid",
                borderRadius: "30px",
                borderColor: "secondary.dark",
                bgcolor: "primary.dark",
              }}
            >
              <Stack
                direction="row"
                sx={{ margin: 5, borderRadius: "30px" }}
                alignItems="center"
                justifyContent="center" // Add this line
                margin="auto"
              >
                <SvgIcon sx={{ fontSize: 70, borderRadius: "30%" }}>
                  <Logo />
                </SvgIcon>
                <Stack flexGrow="1">
                  <Typography
                    sx={{ marginX: 5, marginBottom: 5 }}
                    variant="h5"
                    color="secondary.dark"
                  >
                    {offer?.company}
                  </Typography>
                  <Typography
                    sx={{ marginX: 5 }}
                    variant="h6"
                    color="secondary.dark"
                  >
                    Price: {offer?.totalPrice} PLN
                  </Typography>
                  <Typography
                    sx={{ marginX: 5 }}
                    variant="h6"
                    color="secondary.dark"
                  >
                    Valid Until:{" "}
                    {new Date(offer?.expiringAt)
                      .getHours()
                      .toString()
                      .padStart(2, "0")}
                    :
                    {new Date(offer?.expiringAt)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                  </Typography>
                </Stack>

                <Button
                  onClick={handleOpen}
                  sx={{
                    bgcolor: "secondary.dark",
                    marginX: "15px",
                    paddingX: "15px",
                    ":hover": { bgcolor: "#616161" },
                  }}
                  size="medium"
                  disableElevation
                >
                  <Typography
                    noWrap
                    component="div"
                    sx={{
                      textTransform: "none",
                      color: "primary.main",
                      fontSize: 15,
                      fontWeight: "bold",
                      display: { sm: "block" },
                      verticalAlign: "middle",
                    }}
                  >
                    Pick Offer
                  </Typography>
                </Button>

                <OfferDetails
                  open={open}
                  handleClose={handleClose}
                  offerId={offer?.id}
                />
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

function OfferDetails({ open, handleClose, offerId }) {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();

        const response = await getUserInfo(token);

        if (response.error) {
          console.error(response.error);
          return;
        }
        const userInfo = response.response.data;
        setCity(userInfo.address.city);
        setPostalCode(userInfo.address.postalCode);
        setStreet(userInfo.address.street);
        setHouseNumber(userInfo.address.houseNumber);
        setApartmentNumber(userInfo.address.apartmentNumber);
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setEmail(userInfo.email);
      }
    };

    fetchUserInfo(); // Call the function
  }, [getAccessTokenSilently, isAuthenticated]);
  async function handleSubmit() {
    console.log("submit");
    //event.preventDefault();
    const address = {
      city: city,
      postalCode: postalCode,
      street: street,
      houseNumber: houseNumber,
      apartmentNumber: apartmentNumber,
    };
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      companyName: null,
    };
    const resp = await postSelectedOffer(offerId, userInfo);
    if (resp.error) {
      console.error(resp.error);
      return;
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Offer Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MyTextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              label="First Name"
              isRequired={true}
            ></MyTextField>
            <MyTextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              label="Last Name"
              isRequired={true}
            ></MyTextField>
            <MyTextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              label="Email"
              isRequired={true}
            ></MyTextField>
            <MyTextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              label="City"
              isRequired={true}
            />
            <MyTextField
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              label="Postal Code"
              isRequired={true}
            />
            <MyTextField
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              label="Street"
              isRequired={true}
            />
            <MyTextField
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              type="text"
              label="House Number"
              isRequired={true}
            />
            <MyTextField
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              type="text"
              label="Apartment Number"
              isRequired={true}
            />
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
            //type="submit"
            onClick={handleSubmit}
          >
            <Typography fontWeight="bold" color="primary.main">
              Submit
            </Typography>
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
