import { SvgIconComponent } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export type StepProps = React.PropsWithChildren<{
  Icon: SvgIconComponent;
  title: string;
}>;

export const Step = ({ Icon, title, children }: StepProps) => {
  return (
    <Box flex="1 1 0">
      <Stack direction="column" spacing={3}>
        <Icon color="primary" sx={{ fontSize: 96 }} />
        <Typography variant="h4">{title}</Typography>
        {children}
      </Stack>
    </Box>
  );
};
