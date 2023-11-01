import {Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/LynxLogo.svg";

export default function MainPage() {
  return (
    <Box sx={{ flexGrow: 1 }} margin="auto">
      <Stack
        spacing={5}
        sx={{
          bgcolor: "primary.main",
          textAlign: "center",
          display: "block",
        }}
      >
        <Box>
          <Stack direction="row" bgcolor="third.main" sx={{margin:5, borderRadius:'30px'}}>
            <Stack flexGrow="1">
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize="30px"
                sx={{ marginY: 10, marginX:5 }}
                color="third.light"
              >
                Your Delivery, Our Priority
              </Typography>
              <Typography sx={{marginX:5}} variant="h5" color="third.light">
                We're the delivery dream team! With a passion for convenience
                and a commitment to quality, we're the folks who bring the world
                to your door. From doorstep to delicious – we've got you
                covered!
              </Typography>
            </Stack>

            <SvgIcon
              sx={{
                fontSize: 400,
                borderRadius: "20%",
                marginX: 10,
                marginY: 4,
              }}
            >
              <Logo />
            </SvgIcon>
          </Stack>
        </Box>

      </Stack>
    </Box>
  );
}
