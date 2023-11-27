import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";

export default function OffersPage() {
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
                Lynx Delivery
              </Typography>
              <Typography
                sx={{ marginX: 5 }}
                variant="h6"
                color="secondary.dark"
              >
                Price: $10
              </Typography>
              <Typography
                sx={{ marginX: 5}}
                variant="h6"
                color="secondary.dark"
              >
                Valid Until: 10/10/2021
              </Typography>
            </Stack>

            <Button
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
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
