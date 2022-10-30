import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { ReturnLink } from "../../components/ReturnLink";

export const ParticipantsPage = () => {
  return (
    <ConstrainedLayout>
      <ReturnLink to="../opportunities?mine">Back to my posts</ReturnLink>
      <h1>Participants</h1>
      <p>List of participants</p>
    </ConstrainedLayout>
  );
};
