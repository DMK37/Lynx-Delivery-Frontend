import { Box, Typography } from "@mui/material";
import UserOrdersTable from "../components/user-orders-table";

export default function UserOrdersPage() {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxWidth="xl"
    >
      <Typography textAlign={"center"} variant="h4" sx={{ margin: "20px" }}>
        Orders
      </Typography>
      <UserOrdersTable />
    </Box>
  );
}
