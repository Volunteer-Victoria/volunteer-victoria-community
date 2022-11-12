import { LoadingCard } from "./LoadingCard";

type LoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const Loader = ({ children, loading }: LoaderProps) => {
  if (loading) {
    return <LoadingCard />;
  }

  return <>{children}</>;
};
