import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyAppBar from "./components/MyAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from '@mui/material/Box';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Outlet } from 'react-router';
import LoginAppBar from "./components/LoginAppBar";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f2f2f2',
            dark: '#e5e6e4'

        },
        secondary: {
            main: '#f77f00',
            dark: '#000000'
        },
        third: {
            light:'#caecec',
            main: '#173C49'
        }
    },
    typography: {
        fontFamily:'Inter'
    }
});



export default function CourierApp() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<WithAppBar/>}>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/signup' element={<SignUpPage/>} />
                        </Route>
                        <Route element={<WithoutAppBar/>}>
                        <Route path='/signin' element={<LoginPage/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Box>
    )
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