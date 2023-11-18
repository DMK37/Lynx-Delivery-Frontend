import { Box, Typography } from "@mui/material";
import React from "react";

export const NotFoundPage = () => {
  return (
    <Box textAlign="center">
      <Typography sx={{ marginX: 5, marginBottom: 5 }} variant="h4">
        Page Not Found
      </Typography>
    </Box>
  );
};
