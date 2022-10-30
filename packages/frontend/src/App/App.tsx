import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import {
  CreateOpportunityPage,
  LoginPage,
  OpportunitiesPage,
  OpportunityPage,
  ParticipantsPage,
} from "../pages";
import { theme } from "../theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="opportunities/create"
            element={<CreateOpportunityPage />}
          />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route
            path="opportunity/:opportunityId/participants"
            element={<ParticipantsPage />}
          />
          <Route
            path="opportunity/:opportunityId"
            element={<OpportunityPage />}
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
