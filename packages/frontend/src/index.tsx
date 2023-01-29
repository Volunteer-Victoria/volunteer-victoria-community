import React from "react";
import ReactDOM from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import "./index.css";
import { App } from "./App";
import { AuthProvider } from "./components/AuthProvider";
import { ApiProvider } from "./components/ApiProvider/ApiProvider";
import { UserProvider } from "./components/UserDataProvider/UserProvider";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ApiProvider>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </LocalizationProvider>
        </ApiProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
