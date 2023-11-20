import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/LynxLogo.svg";
import { useAuth0 } from "@auth0/auth0-react";

export default function MainPage() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>;
  }

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
        <Box sx={{ maxWidth: "xl" }}>
          <Stack
            direction="row"
            bgcolor="third.main"
            sx={{ margin: 5, borderRadius: "30px" }}
          >
            <Stack flexGrow="1">
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize="30px"
                sx={{ marginTop: 10, marginX: 5, marginBottom: 5 }}
                color="third.light"
              >
                Lynx Delivery
              </Typography>
              <Typography
                sx={{ marginX: 5, marginBottom: 5 }}
                variant="h5"
                color="third.light"
              >
                Lynx Delivery is your trusted partner in seamless delivery
                solutions. With a commitment to speed and reliability, we
                specialize in timely transportation of goods, ensuring your
                packages reach their destination with precision.
              </Typography>
            </Stack>

            <SvgIcon
              sx={{
                fontSize: 400,
                borderRadius: "20%",
                marginX: 10,
                marginY: 4,
                display: { xs: "none", md: "block" },
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
