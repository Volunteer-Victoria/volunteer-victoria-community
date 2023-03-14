import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { DateTime } from "luxon";
import { useApi } from "../components/ApiProvider";
import { MainLayout } from "../components/MainLayout";
import {
  LoginPage,
  CreateOpportunityPage,
  OpportunitiesPage,
  ErrorPage,
  OpportunityPage,
  EditOpportunityPage,
  LandingPage,
  ExpressInterestPage,
  TermsAndConditionsPage,
  PrivacyPolicyPage,
  ThanksForSharingPage,
  ThanksForApplyingPage,
} from "../pages";
import { appTheme } from "../themes";

function App() {
  const api = useApi();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="opportunities/create"
            element={<CreateOpportunityPage />}
          />
          <Route
            path="opportunities"
            element={<OpportunitiesPage />}
            loader={() => {
              return api.opportunityControllerGet({
                minOccursDate: DateTime.now().toFormat("yyyy-MM-dd"),
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
            path="opportunity/:opportunityId/thanks"
            loader={({ params }) => {
              return api.opportunityControllerGetId({
                id: params.opportunityId ?? "",
              });
            }}
            element={<ThanksForSharingPage />}
          />
          <Route
            path="opportunity/:opportunityId/apply"
            loader={({ params }) => {
              return api.opportunityControllerGetId({
                id: params.opportunityId ?? "",
              });
            }}
            element={<ExpressInterestPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="opportunity/:opportunityId/apply/thanks"
            loader={({ params }) => {
              return api.opportunityControllerGetId({
                id: params.opportunityId ?? "",
              });
            }}
            element={<ThanksForApplyingPage />}
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Route>
    )
  );
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
