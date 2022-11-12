import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import {
  LoginPage,
  CreateOpportunityPage,
  OpportunitiesPage,
  ErrorPage,
  ParticipantsPage,
  OpportunityPage,
} from "../pages";
import { theme } from "../theme";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="opportunities/create"
          element={<CreateOpportunityPage />}
        />
        <Route
          path="opportunities"
          element={<OpportunitiesPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="opportunity/:opportunityId/participants"
          element={<ParticipantsPage />}
        />
        <Route
          path="opportunity/:opportunityId"
          element={<OpportunityPage />}
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Route>
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
