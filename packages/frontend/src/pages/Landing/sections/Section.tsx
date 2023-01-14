import { Breakpoint, Container } from "@mui/material";
import { Box } from "@mui/system";

type SectionProps = React.PropsWithChildren<{
  background: "white" | "shaded";
  maxWidth?: Breakpoint;
}>;

export const Section = ({ background, children, maxWidth }: SectionProps) => {
  return (
    <Box
      sx={{
        backgroundColor: background === "white" ? "white" : "#e5e5e5",
        py: 12,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};
