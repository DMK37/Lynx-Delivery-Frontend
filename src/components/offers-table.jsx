import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

export default function OffersTable({ rows, offers }) {
  const columns = [
    {
      field: "id",
      headerName: "Id",
      //width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "inquiry",
      headerName: "Inquiry",
      width: 250,
      sorttable: false,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const onClick = () => {};

        return (
          <Button
            sx={{
              bgcolor: "secondary.main",
              marginX: "15px",
              paddingX: "15px",
              ":hover": { bgcolor: "secondary.dark" },
            }}
            disableElevation
            onClick={onClick}
          >
            <Typography>Inquiry Details</Typography>
          </Button>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      //width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      //width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullDetails",
      headerName: "Full Details",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {};

        return (
          <Button
            sx={{
              bgcolor: "secondary.main",
              marginX: "15px",
              paddingX: "15px",
              ":hover": { bgcolor: "secondary.dark" },
            }}
            disableElevation
            onClick={onClick}
          >
            <Typography>Details</Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <DataGrid rows={rows} columns={columns} sx={{ borderRadius: 5 }} />
    </div>
  );
}
