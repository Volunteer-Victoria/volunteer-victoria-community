import { Box } from "@mui/system";
import { PropsWithChildren } from "react";
import { ReturnLink } from "../ReturnLink";

type ReturnableLayoutProps = PropsWithChildren<{
  to?: string;
  label?: string;
}>;

export const ReturnableLayout = ({
  children,
  to = "/opportunities",
  label = "Back to all opportunities",
}: ReturnableLayoutProps) => {
  return (
    <>
      <Box pb={3}>
        <ReturnLink to={to}>{label}</ReturnLink>
      </Box>
      {children}
    </>
  );
};
