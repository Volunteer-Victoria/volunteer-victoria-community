import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { AppBar } from "../components/AppBar/AppBar";
import {
  CreateOpportunityPage,
  LoginPage,
  OpportunitiesPage,
  OpportunityPage,
  ParticipantsPage,
  SignupPage,
} from "../pages";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
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
        <Route
          path="*"
          element={<Navigate to="opportunities" replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
