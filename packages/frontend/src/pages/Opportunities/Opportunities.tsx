import { Link } from "react-router-dom";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";

export const OpportunitiesPage = () => {
  return (
    <ConstrainedLayout>
      <h1>Opportunities</h1>
      <Link to="create">Create</Link>
      <br />
      <Link to="../opportunity/123">Opportunity 123</Link>
      <br />
      <Link to="../opportunity/123/participants">
        Opportunity 123 Participants
      </Link>
    </ConstrainedLayout>
  );
};
