import { Link } from "react-router-dom";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";

export const LoginPage = () => {
  return (
    <ConstrainedLayout>
      <h1>Login page</h1>
      <Link to="../opportunities">Login</Link>
    </ConstrainedLayout>
  );
};
