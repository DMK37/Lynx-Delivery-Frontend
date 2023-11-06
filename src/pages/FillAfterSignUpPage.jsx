import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import MyTextField from "../components/MyTextField";

export default function FillAfterSignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("firstName"),
      password: data.get("secondName"),
    });
  };
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
          Fill Information About You
        </Typography>
        <Box maxWidth={400} marginBottom={5}>
          <MyTextField name="firstName" type="text" label="First Name" />
          <MyTextField name="secondName" type="text" label="Second Name" />
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
            maxWidth={400}
            alignItems="center"
            justifyContent="center"
            margin="auto"
            marginRight={5}
          >
            <Typography variant="h4" padding={2} height={70}>
              Address
            </Typography>
            <MyTextField name="city" type="text" label="City" />
            <MyTextField name="postalCode" type="text" label="PostalCode" />
            <MyTextField name="street" type="text" label="Street" />
            <MyTextField name="houseNumber" type="text" label="HouseNumber" />
            <MyTextField
              name="apartmentNumber"
              type="text"
              label="ApartmentNumber"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            maxWidth={400}
            alignItems="center"
            justifyContent="center"
            margin="auto"
            marginLeft={5}
          >
            <Typography variant="h4" padding={2} height={70}>
              Default Source Address
            </Typography>
            <MyTextField name="DFcity" type="text" label="City" />
            <MyTextField name="DFpostalCode" type="text" label="PostalCode" />
            <MyTextField name="DFstreet" type="text" label="Street" />
            <MyTextField name="DFhouseNumber" type="text" label="HouseNumber" />
            <MyTextField
              name="DFapartmentNumber"
              type="text"
              label="ApartmentNumber"
            />
          </Box>
        </Box>
        <Box display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          textAlign={"center"}>
        <Link component={RouterLink} to="/" sx={{ paddingTop: 0.5, marginRight:3 }}>
          <Typography
            sx={{
              color: "secondary.dark",
              ":hover": {
                color: "secondary.main",
              },
            }}
          >
            Fill Later
          </Typography>
        </Link>
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
            Fill
          </Typography>
        </Button>
        </Box>
       
      </Box>
    </Box>
  );
}
