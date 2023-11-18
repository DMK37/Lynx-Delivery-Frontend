import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import MyTextField from "../components/my-text-field";
import { updateUserInfo } from "../api/backendService";

export default function ProfilePage() {
  const { getAccessTokenSilently, user } = useAuth0();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: {
        city:  data.get("city"),
        postalCode: data.get("postalCode"),
        street: data.get("street"),
        houseNumber: data.get("houseNumber"),
        apartmentNumber: data.get("apartmentNumber")
      },
      sourceAddress: {
        city:  data.get("DFcity"),
        postalCode: data.get("DFpostalCode"),
        street: data.get("DFstreet"),
        houseNumber: data.get("DFhouseNumber"),
        apartmentNumber: data.get("DFapartmentNumber")
      }
    }
    const token = await getAccessTokenSilently();
    await updateUserInfo(userInfo, token);
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
          Your Information {user.email}
        </Typography>
        <Box maxWidth={400} marginBottom={5}>
          <MyTextField
            name="firstName"
            type="text"
            label="First Name"
            isRequired={false}
          />
          <MyTextField
            name="lastName"
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
              name="city"
              type="text"
              label="City"
              isRequired={false}
            />
            <MyTextField
              name="postalCode"
              type="text"
              label="Postal Code"
              isRequired={false}
            />
            <MyTextField
              name="street"
              type="text"
              label="Street"
              isRequired={false}
            />
            <MyTextField
              name="houseNumber"
              type="text"
              label="House Number"
              isRequired={false}
            />
            <MyTextField
              name="apartmentNumber"
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
              name="DFcity"
              type="text"
              label="City"
              isRequired={false}
            />
            <MyTextField
              name="DFpostalCode"
              type="text"
              label="Postal Code"
              isRequired={false}
            />
            <MyTextField
              name="DFstreet"
              type="text"
              label="Street"
              isRequired={false}
            />
            <MyTextField
              name="DFhouseNumber"
              type="text"
              label="House Number"
              isRequired={false}
            />
            <MyTextField
              name="DFapartmentNumber"
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
