import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import MyTextField from "../components/my-text-field";
import { getUserInfo, updateUserInfo } from "../api/backendService";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [DFcity, setDFCity] = useState("");
  const [DFpostalCode, setDFPostalCode] = useState("");
  const [DFstreet, setDFStreet] = useState("");
  const [DFhouseNumber, setDFHouseNumber] = useState("");
  const [DFapartmentNumber, setDFApartmentNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      userId: "",
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      companyName: "",
      address: {
        city: city,
        postalCode: postalCode,
        street: street,
        houseNumber: houseNumber,
        apartmentNumber: apartmentNumber,
      },
      defaultSourceAddress: {
        city: DFcity,
        postalCode: DFpostalCode,
        street: DFstreet,
        houseNumber: DFhouseNumber,
        apartmentNumber: DFapartmentNumber,
      },
    };
    const token = await getAccessTokenSilently();
    await updateUserInfo(userInfo, token);
  };

  useEffect(() => {
    const setValues = async () => {
      const token = await getAccessTokenSilently();
      const userInfo = await getUserInfo(token);
      if (userInfo.error == null) {
        setFirstName(userInfo.response.data.firstName);
        setLastName(userInfo.response.data.lastName);
        setCity(userInfo.response.data.address.city);
        setStreet(userInfo.response.data.address.street);
        setPostalCode(userInfo.response.data.address.postalCode);
        setHouseNumber(userInfo.response.data.address.houseNumber);
        setApartmentNumber(userInfo.response.data.address.apartmentNumber);
        setDFCity(userInfo.response.data.defaultSourceAddress.city);
        setDFStreet(userInfo.response.data.defaultSourceAddress.street);
        setDFPostalCode(userInfo.response.data.defaultSourceAddress.postalCode);
        setDFHouseNumber(
          userInfo.response.data.defaultSourceAddress.houseNumber
        );
        setDFApartmentNumber(
          userInfo.response.data.defaultSourceAddress.apartmentNumber
        );
      }
    };
    setValues();
  }, [getAccessTokenSilently, user.sub]);

  return (
    <Box bgcolor="primary.main">
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        textAlign={"center"}
        marginTop={5}
      >
        <Typography variant="h3" padding={2}>
          Your Information {user.email}
        </Typography>
        <Box maxWidth={400} marginBottom={5}>
          <MyTextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            label="First Name"
            isRequired={false}
          />
          <MyTextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            label="Last Name"
            isRequired={false}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          textAlign={"center"}
        >
          <Box
            display="flex"
            flexDirection="column"
            width={400}
            alignItems="center"
            justifyContent="center"
            margin="auto"
            marginRight={5}
          >
            <Typography variant="h4" padding={2} height={70}>
              Address
            </Typography>
            <MyTextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              label="City"
              isRequired={false}
            />
            <MyTextField
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              label="Postal Code"
              isRequired={false}
            />
            <MyTextField
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              label="Street"
              isRequired={false}
            />
            <MyTextField
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              type="text"
              label="House Number"
              isRequired={false}
            />
            <MyTextField
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              type="text"
              label="Apartment Number"
              isRequired={false}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={400}
            alignItems="center"
            justifyContent="center"
            margin="auto"
            marginLeft={5}
          >
            <Typography variant="h4" padding={2} height={70}>
              Default Source Address
            </Typography>
            <MyTextField
              value={DFcity}
              onChange={(e) => setDFCity(e.target.value)}
              type="text"
              label="City"
              isRequired={false}
            />
            <MyTextField
              value={DFpostalCode}
              onChange={(e) => setDFPostalCode(e.target.value)}
              type="text"
              label="Postal Code"
              isRequired={false}
            />
            <MyTextField
              value={DFstreet}
              onChange={(e) => setDFStreet(e.target.value)}
              type="text"
              label="Street"
              isRequired={false}
            />
            <MyTextField
              value={DFhouseNumber}
              onChange={(e) => setDFHouseNumber(e.target.value)}
              type="text"
              label="House Number"
              isRequired={false}
            />
            <MyTextField
              value={DFapartmentNumber}
              onChange={(e) => setDFApartmentNumber(e.target.value)}
              type="text"
              label="Apartment Number"
              isRequired={false}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          textAlign={"center"}
        >
          <Button
            color="secondary"
            sx={{
              marginY: 3,
              paddingX: 4,
              ":hover": { backgroundColor: "secondary.semydark" },
              textTransform: "none",
            }}
            disableElevation
            variant="contained"
            type="submit"
          >
            <Typography fontWeight="bold" color="primary.main">
              Save
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
