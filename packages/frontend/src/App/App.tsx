import { LocalDate } from "@js-joda/core";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useApi } from "../components/ApiProvider";
import { MainLayout } from "../components/MainLayout";
import {
  LoginPage,
  CreateOpportunityPage,
  OpportunitiesPage,
  ErrorPage,
  OpportunityPage,
  EditOpportunityPage,
} from "../pages";
import { theme } from "../theme";

function App() {
  const api = useApi();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="opportunities/create"
          element={<CreateOpportunityPage />}
        />
        <Route
          path="opportunities"
          element={<OpportunitiesPage />}
          loader={() => {
            console.log("FETCHING OPPS");
            return api.opportunityControllerGet({
              minOccursDate: LocalDate.now().toString(),
            });
          }}
          errorElement={<ErrorPage />}
        />
        <Route
          path="opportunity/:opportunityId/edit"
          loader={({ params }) => {
            return api.opportunityControllerGetId({
              id: params.opportunityId ?? "",
            });
          }}
          element={<EditOpportunityPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="opportunity/:opportunityId"
          loader={({ params }) => {
            return api.opportunityControllerGetId({
              id: params.opportunityId ?? "",
            });
          }}
          element={<OpportunityPage />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/"
          element={<Navigate to="/opportunities" replace={true} />}
        />
        <Route
          path="*"
          element={<Navigate to="/opportunities" replace={true} />}
        />
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
