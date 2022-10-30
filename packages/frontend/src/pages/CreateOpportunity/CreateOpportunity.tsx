import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { ReturnLink } from "../../components/ReturnLink";

export const CreateOpportunityPage = () => {
  return (
    <ConstrainedLayout>
      <ReturnLink to="../opportunities">Back to all opportunities</ReturnLink>
      <h1>Create Opportunity</h1>
      <p>Form to create an opportunity here</p>
    </ConstrainedLayout>
  );
};
