import { Link } from "react-router-dom";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";

export const SignupPage = () => {
  return (
    <ConstrainedLayout>
      <h1>Signup page</h1>
      <Link to="../opportunities">Signup</Link>
    </ConstrainedLayout>
  );
};
