import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "../images/BlackLynx.svg";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import MyTextField from "../components/my-text-field";
import { createOffers } from "../api/backendService";
import { useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function OffersPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [offer, setOffer] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const params = useParams();
  useEffect(() => {
    const crtOffers = async () => {
      const token = await getAccessTokenSilently();
      const offers = await createOffers(params.id, token);
      console.log(offers);
      setOffer(offers.response.data);
      localStorage.setItem("offers", JSON.stringify(offers.response.data));
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
                Price: {offer?.price.fullPrice}
              </Typography>
              <Typography
                sx={{ marginX: 5 }}
                variant="h6"
                color="secondary.dark"
              >
                Valid Until: {offer?.expireDate}
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
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "30px",
                }}
              >
                <Typography id="modal-title" variant="h6" component="h2">
                  Offer Details
                </Typography>

                <MyTextField
                  type="text"
                  label="First Name"
                  isRequired={true}
                ></MyTextField>
                <MyTextField
                  type="text"
                  label="Last Name"
                  isRequired={true}
                ></MyTextField>
                <MyTextField
                  type="text"
                  label="Email"
                  isRequired={true}
                ></MyTextField>
              </Box>
            </Modal>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
