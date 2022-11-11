import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { getConfiguredApi } from "../common";
import { MainLayout } from "../components/MainLayout";
import {
  LoginPage,
  CreateOpportunityPage,
  OpportunitiesPage,
  ParticipantsPage,
  OpportunityPage,
  ErrorPage,
} from "../pages";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<LoginPage />} />
      <Route path="opportunities/create" element={<CreateOpportunityPage />} />
      <Route
        path="opportunities"
        element={<OpportunitiesPage />}
        loader={async () => {
          return await getConfiguredApi().opportunityControllerGet();
        }}
        errorElement={<ErrorPage />}
      />
      <Route
        path="opportunity/:opportunityId/participants"
        element={<ParticipantsPage />}
      />
      <Route path="opportunity/:opportunityId" element={<OpportunityPage />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Route>
  )
);
