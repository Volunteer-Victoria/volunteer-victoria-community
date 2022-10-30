import { Container } from "@mui/material";

type ConstrainedLayoutProps = React.PropsWithChildren;

export const ConstrainedLayout = ({ children }: ConstrainedLayoutProps) => {
  return <Container>{children}</Container>;
};
