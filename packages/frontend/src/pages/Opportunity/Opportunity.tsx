import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { ReturnLink } from "../../components/ReturnLink";

export const OpportunityPage = () => {
  return (
    <ConstrainedLayout>
      <ReturnLink to="../opportunities">Back to all opportunities</ReturnLink>
      <h1>Opportunity</h1>
      <p>Details about the opportunity here</p>
    </ConstrainedLayout>
  );
};
