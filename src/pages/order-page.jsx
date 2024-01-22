import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderById } from "../api/backendService";
import { useParams } from "react-router-dom";

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const orderStatus = {
    0: "Accepted",
    1: "Picked Up",
    2: "Cannot Deliver",
    3: "Delivered",
  };

  useEffect(() => {
    const setValues = async () => {
      setLoading(true);
      //const order = await getOrder(id);
      //setOrder(order.response.data);
      const ord = await getOrderById(id);
      setOrder(ord.response.data);
      setLastUpdate(new Date(ord.response.data.lastUpdate));
      setLoading(false);
    };
    setValues();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        bgcolor={"white"}
        m={5}
        borderRadius={8}
        p={2}
        maxWidth={600}
        flexGrow={1}
      >
        <Typography variant="h3" textAlign={"center"}>
          Order
        </Typography>
        <Typography variant="h5" marginBottom={1}>Order Id: {order?.id}</Typography>
        <Typography variant="h5" marginBottom={1}>Order Status: {orderStatus[order?.orderStatus]}</Typography>
        {order?.comment && <Typography variant="h5" marginBottom={1}>Order Comment: {order?.comment}</Typography>}
        <Typography marginBottom={1} variant="h5">
          Last Update: {" "}
          {lastUpdate?.getFullYear().toString().padStart(2, "0")}/
          {(lastUpdate?.getMonth() + 1).toString().padStart(2, "0")}/
          {lastUpdate?.getDate().toString().padStart(2, "0")}{" "}
          {lastUpdate?.getHours().toString().padStart(2, "0")}:
          {lastUpdate?.getMinutes().toString().padStart(2, "0")}
        </Typography>
        <Typography marginBottom={1} variant="h5">
          Courier Name: {order?.courierName}
        </Typography>
      </Box>
    </Box>
  );
}
