import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import MyTextField from "../components/my-text-field";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createInqury, getUserInfo } from "../api/backendService";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateInquiryPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [deliveryDate, setDeliveryDate] = useState(dayjs());
  const [pickUpDate, setPickUpDate] = useState(dayjs());
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [length, setLength] = useState(10);
  const [weight, setWeight] = useState(1);
  const [Scity, setSCity] = useState("");
  const [SpostalCode, setSPostalCode] = useState("");
  const [Sstreet, setSStreet] = useState("");
  const [ShouseNumber, setSHouseNumber] = useState("");
  const [SapartmentNumber, setSApartmentNumber] = useState("");
  const [Dcity, setDCity] = useState("");
  const [DpostalCode, setDPostalCode] = useState("");
  const [Dstreet, setDStreet] = useState("");
  const [DhouseNumber, setDHouseNumber] = useState("");
  const [DapartmentNumber, setDApartmentNumber] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [atWeekend, setAtWeekend] = useState(false);
  const [highPriority, setHighPriority] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    let userId = null;
    if(isAuthenticated) {
      userId = user.sub;
    }
    const inquiry = {
      userId: userId,
      pickUpDate: pickUpDate,
      deliveryDate: deliveryDate,
      package: {
        width: width,
        height: height,
        length: length,
        weight: weight,
      },
      sourceAddress: {
        city: Scity,
        postalCode: SpostalCode,
        street: Sstreet,
        houseNumber: ShouseNumber,
        apartmentNumber: SapartmentNumber,
      },
      destinationAddress: {
        city: Dcity,
        postalCode: DpostalCode,
        street: Dstreet,
        houseNumber: DhouseNumber,
        apartmentNumber: DapartmentNumber,
      },
      isCompany: isCompany,
      highPriority: highPriority,
      deliveryAtWeekend: atWeekend,
    };
    let token = null;
    if (isAuthenticated) {
      token = await getAccessTokenSilently();
    }
    createInqury(inquiry, token);
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const userInfo = await getUserInfo(token);
      if (userInfo.error == null) {
        setSCity(userInfo.response.data.defaultSourceAddress.city);
        setSStreet(userInfo.response.data.defaultSourceAddress.street);
        setSPostalCode(userInfo.response.data.defaultSourceAddress.postalCode);
        setSHouseNumber(
          userInfo.response.data.defaultSourceAddress.houseNumber
        );
        setSApartmentNumber(
          userInfo.response.data.defaultSourceAddress.apartmentNumber
        );
      }
    };
    setValues();
  }, [getAccessTokenSilently, isAuthenticated, user?.sub]);

  return (
    <Box
      sx={{ flexGrow: 1 }}
      alignItems="center"
      justifyContent="center"
      margin="auto"
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
        <Box component="form" onSubmit={handleSubmit} maxWidth={1200}>
          <Stack
            direction="column"
            bgcolor="third.pink"
            sx={{ margin: 5, borderRadius: "30px" }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="30px"
              sx={{ margin: 5 }}
              color="third.pinktext"
            >
              Create Inquiry
            </Typography>
            <Stack sx={{ marginX: 5, marginBottom: 5 }}>
              <Box
                border={1}
                sx={{
                  borderColor: "third.pinktext",
                  borderRadius: "30px",
                  padding: "5px",
                  paddingBottom: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize="25px"
                  color="third.pinktext"
                >
                  Package Information
                </Typography>
                <MyTextField
                  value={height}
                  type="number"
                  label="Height"
                  onChange={(e) => setHeight(e.target.value)}
                  isRequired={true}
                ></MyTextField>
                <MyTextField
                  value={width}
                  type="number"
                  label="Width"
                  onChange={(e) => setWidth(e.target.value)}
                ></MyTextField>
                <MyTextField
                  value={length}
                  type="number"
                  label="Length"
                  onChange={(e) => setLength(e.target.value)}
                  isRequired={true}
                ></MyTextField>
                <MyTextField
                  value={weight}
                  type="number"
                  label="Weight"
                  onChange={(e) => setWeight(e.target.value)}
                  isRequired={true}
                ></MyTextField>
              </Box>
            </Stack>

            <Stack sx={{ marginX: 5, marginBottom: 5 }}>
              <Box
                border={1}
                sx={{
                  borderColor: "third.pinktext",
                  borderRadius: "30px",
                  padding: "5px",
                  paddingBottom: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize="25px"
                  color="third.pinktext"
                >
                  Delivery Information
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Pickup Date"
                    value={pickUpDate}
                    onChange={(newValue) => setPickUpDate(newValue)}
                    disablePast
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Delivery Date"
                    value={deliveryDate}
                    onChange={(newValue) => setDeliveryDate(newValue)}
                    disablePast
                  />
                </LocalizationProvider>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize="25px"
                  color="third.pinktext"
                >
                  Source Address
                </Typography>
                <MyTextField
                  value={Scity}
                  onChange={(e) => setSCity(e.target.value)}
                  type="text"
                  label="City"
                  isRequired={true}
                />
                <MyTextField
                  value={SpostalCode}
                  onChange={(e) => setSPostalCode(e.target.value)}
                  type="text"
                  label="Postal Code"
                  isRequired={true}
                />
                <MyTextField
                  value={Sstreet}
                  onChange={(e) => setSStreet(e.target.value)}
                  type="text"
                  label="Street"
                  isRequired={true}
                />
                <MyTextField
                  value={ShouseNumber}
                  onChange={(e) => setSHouseNumber(e.target.value)}
                  type="text"
                  label="House Number"
                  isRequired={true}
                />
                <MyTextField
                  value={SapartmentNumber}
                  onChange={(e) => setSApartmentNumber(e.target.value)}
                  type="text"
                  label="Apartment Number"
                  isRequired={true}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize="25px"
                  color="third.pinktext"
                >
                  Destination Address
                </Typography>
                <MyTextField
                  value={Dcity}
                  onChange={(e) => setDCity(e.target.value)}
                  type="text"
                  label="City"
                  isRequired={true}
                />
                <MyTextField
                  value={DpostalCode}
                  onChange={(e) => setDPostalCode(e.target.value)}
                  type="text"
                  label="Postal Code"
                  isRequired={true}
                />
                <MyTextField
                  value={Dstreet}
                  onChange={(e) => setDStreet(e.target.value)}
                  type="text"
                  label="Street"
                  isRequired={true}
                />
                <MyTextField
                  value={DhouseNumber}
                  onChange={(e) => setDHouseNumber(e.target.value)}
                  type="text"
                  label="House Number"
                  isRequired={true}
                />
                <MyTextField
                  value={DapartmentNumber}
                  onChange={(e) => setDApartmentNumber(e.target.value)}
                  type="text"
                  label="Apartment Number"
                  isRequired={true}
                />
                <Box>
                  <FormControlLabel
                    checked={isCompany}
                    onChange={e => setIsCompany(e.target.checked)}
                    control={<Checkbox  />}
                    label="Is Company"
                  />
                  <FormControlLabel
                    checked={highPriority}
                    onChange={e => setHighPriority(e.target.checked)}
                    control={<Checkbox  />}
                    label="High Priority"
                  />
                  <FormControlLabel
                    checked={atWeekend}
                    onChange={e => setAtWeekend(e.target.checked)}
                    control={<Checkbox  />}
                    label="Delivery at the weekend"
                  />
                </Box>
              </Box>
            </Stack>
            <Stack
              justifyContent="center"
              gap={2}
              flexDirection="row"
              width={1.0}
              flexWrap="wrap"
            >
              <Button
                color="secondary"
                sx={{
                  width: 250,
                  marginY: 3,
                  paddingX: 4,
                  ":hover": { backgroundColor: "third.pinktext" },
                  textTransform: "none",
                }}
                disableElevation
                variant="contained"
                type="submit"
              >
                <Typography fontWeight="bold" color="primary.main">
                  Create inquiry
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
