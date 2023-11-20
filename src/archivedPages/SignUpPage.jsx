import * as React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ReactComponent as GoogleLogo } from "../images/GoogleLogo.svg";
import { ReactComponent as FacebookLogo } from "../images/FacebookLogo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import MyTextField from "../components/MyTextField";

export default function SignUpPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Box bgcolor="primary.main">
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        maxWidth={400}
        alignItems="center"
        justifyContent="center"
        margin="auto"
        textAlign={"center"}
        marginTop={5}
      >
        <Typography variant="h3" padding={2}>
          Create your account
        </Typography>
        <MyTextField name={"firstName"} type="text" label="First Name" />
        <MyTextField name="secondName" type="text" label="Second Name" />
        <MyTextField name="address" type="text" label="Address" />
        <MyTextField name="email" type="email" label="Email" />
        <MyTextField name="password" type="password" label="Password" />

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
            Sign Up
          </Typography>
        </Button>

        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "textfield.main",
            },
            marginTop: 3,
          }}
          flexItem
        >
          <Typography color="black">OR</Typography>
        </Divider>
        <Button
          color="primary"
          sx={{
            marginTop: 2,
            paddingX: 4,
            textTransform: "none",
            borderColor: "textfield.main",
            ":hover": {
              backgroundColor: "primary.dark",
              borderColor: "textfield.main",
            },
            justifyContent: "flex-start",
            width: "90%",
          }}
          disableElevation
          variant="outlined"
        >
          <SvgIcon sx={{ marginY: 1, marginRight: 2 }}>
            <GoogleLogo />
          </SvgIcon>
          <Typography color="black">Continue with Google</Typography>
        </Button>

        <Button
          color="primary"
          sx={{
            marginTop: 1,
            paddingX: 4,
            textTransform: "none",
            borderColor: "textfield.main",
            ":hover": {
              backgroundColor: "primary.dark",
              borderColor: "textfield.main",
            },
            width: "90%",
            justifyContent: "flex-start",
          }}
          disableElevation
          variant="outlined"
          marginBottom={5}
        >
          <SvgIcon sx={{ marginY: 1, marginRight: 2 }}>
            <FacebookLogo />
          </SvgIcon>
          <Typography color="black">Continue with Facebook</Typography>
        </Button>
      </Box>
    </Box>
  );
}
