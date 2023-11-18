import React from 'react';
import { useState } from 'react';
import { Box, Typography, Stack, Button } from "@mui/material";
import MyTextField from "../components/my-text-field";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createInqury } from '../api/backendService';
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateInquiryPage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [value, setValue] = useState(dayjs());
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("firstName"),
    //   password: data.get("secondName"),
    // });
    // const inquiry = {
    //   user:null,
      
    // }
    const token = await getAccessTokenSilently();
    if(isAuthenticated) console.log();
    //createInqury({})
  };
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
        <Box sx={{ maxWidth: "xl" }} component="form" onSubmit={handleSubmit}>
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
                  name="height"
                  type="number"
                  label="Height"
                ></MyTextField>
                <MyTextField
                  name="width"
                  type="number"
                  label="Width"
                ></MyTextField>
                <MyTextField
                  name="length"
                  type="number"
                  label="Length"
                ></MyTextField>
                <MyTextField
                  name="weight"
                  type="number"
                  label="Weight"
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
                  <DatePicker label="Delivery Date" value={value} onChange={(newValue) => setValue(newValue)}  disablePast/>
                </LocalizationProvider>

                <MyTextField
                  name="sourceCity"
                  type="text"
                  label="Source City"
                ></MyTextField>
                <MyTextField
                  name="sourceStreet"
                  type="text"
                  label="Source Street"
                ></MyTextField>

                <MyTextField
                  name="destinationCity"
                  type="text"
                  label="Destination City"
                ></MyTextField>
                <MyTextField
                  name="destinationStreet"
                  type="text"
                  label="Destination Street"
                ></MyTextField>
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
