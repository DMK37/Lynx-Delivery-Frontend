import { Box, Typography } from "@mui/material";

import OrdersTable from "../components/orders-table";

export default function AllOrdersPage() {
      return (
        <Box
          alignItems="center"
          justifyContent="center"
          margin="auto"
          maxWidth="xl"
        >
          <Typography textAlign={"center"} variant="h4" sx={{ margin: "20px" }}>
            All Orders
          </Typography>
          <OrdersTable />
        </Box>
      );
}
