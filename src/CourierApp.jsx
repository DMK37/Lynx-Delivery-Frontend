import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main-page";
import MyAppBar from "./components/my-app-bar";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import LoginAppBar from "./components/login-app-bar";
import ProfilePage from "./pages/profile-page";
import CreateInquiryPage from "./pages/create-inquiry-page";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./components/page-loader";
import { NotFoundPage } from "./pages/not-found-page";
import { AuthenticationGuard } from "./auth/authentication-guard";
import UserInquiriesPage from "./pages/user-inquiries-page";
import OffersPage from "./pages/offers-page";
import AllInquiriesPage from "./pages/all-inquiries-page";
import AllOffersPage from "./pages/all-offers-page";
import PendingOffersPage from "./pages/pending-offers-page";
import AllOrdersPage from "./pages/all-orders-page";
import UserOrdersPage from "./pages/user-orders-page";
import OrderPage from "./pages/order-page";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f2f2f2",
      dark: "#e5e6e4",
    },
    secondary: {
      main: "#f77f00",
      dark: "#000000",
      semydark: "#b35d02",
    },
    third: {
      light: "#caecec",
      main: "#173C49",
      pink: "#f8d7c6",
      pinktext: "#ec5d2a",
      semydark: "#3c8794"
    },
    textfield: {
      main: "#9c9c9c",
      dark: "#000000",
    },
    fourth: {
      primary: "#ec5d2a",
      light: "#f8d7c6",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 15
  },
});

export default function CourierApp() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box>
        <PageLoader />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="primary.main" sx={{ flexGrow: 1 }} minHeight= '100vh'>
        <Routes>
          <Route element={<WithAppBar />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/create-inquiry" element={<CreateInquiryPage />} />
            <Route
             path="/:id/offers" element={<OffersPage />} />
             <Route
             path="/orders/:id" element={<OrderPage />} />
            <Route
              path="/profile"
              element={<AuthenticationGuard component={ProfilePage} />}
            />
            <Route
              path="/inquiries"
              element={<AuthenticationGuard component={UserInquiriesPage} />}
            />
            <Route
              path="/orders"
              element={<AuthenticationGuard component={UserOrdersPage} />}
            />
            <Route
              path="/all-inquiries"
              element={<AuthenticationGuard component={AllInquiriesPage} />}
            />
            <Route
              path="/all-offers"
              element={<AuthenticationGuard component={AllOffersPage} />}
            />
            <Route
              path="/all-orders"
              element={<AuthenticationGuard component={AllOrdersPage} />}
            />
            <Route
              path="/pending-offers"
              element={<AuthenticationGuard component={PendingOffersPage} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<WithoutAppBar />}>
            {
              //pages without buttons on app bar
            }
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

const WithAppBar = () => {
  return (
    <>
      <MyAppBar />
      <Outlet />
    </>
  );
};

const WithoutAppBar = () => {
  return (
    <>
      <LoginAppBar />
      <Outlet />
    </>
  );
};
