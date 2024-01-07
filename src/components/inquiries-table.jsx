import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

export default function InquiriesTable({ rows }) {
  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "package",
      headerName: "Package",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sourceAddress",
      headerName: "Source Address",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "destinationAddress",
      headerName: "Destination Address",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "highPriority",
      headerName: "High Priority",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "deliveryAtWeekend",
      headerName: "Delivery At Weekend",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "orderDetails",
      headerName: "Order Details",
      sortable: false,
      width: 250,
      align: "center",
      disableClickEventBubbling: true,
      headerAlign: "center",
      renderCell: (params) => {
        const onClick = () => {
          console.log(params);
          // const api = params.api;
          // const fields = api
          //   .getAllColumns()
          //   .map((c) => c.field)
          //   .filter((c) => c !== "__check__" && !!c);
          // const thisRow = {};
          // fields.forEach((f) => {
          //   thisRow[f] = params.getValue(params.id, f);
          // });
          // return alert(JSON.stringify(thisRow, null, 2));
        };

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
            <Typography>Order Details</Typography>
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
