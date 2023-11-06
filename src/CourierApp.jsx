import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyAppBar from "./components/MyAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Outlet } from "react-router";
import LoginAppBar from "./components/LoginAppBar";
import FillAfterSignUpPage from "./pages/FillAfterSignUpPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f2f2f2",
      dark: "#e5e6e4",
    },
    secondary: {
      main: "#f77f00",
      dark: "#000000",
      semydark:"#b35d02"
    },
    third: {
      light: "#caecec",
      main: "#173C49",
    },
    textfield: {
        main: "#9c9c9c",
        dark: "#000000",
      },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default function CourierApp() {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="primary.main" sx={{ flexGrow: 1 }} height='100vh'>
        <BrowserRouter>
          <Routes>
            <Route element={<WithAppBar />}>
              <Route path="/" element={<MainPage />} />
            </Route>
            <Route element={<WithoutAppBar />}>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/fill-signup" element={<FillAfterSignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
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
