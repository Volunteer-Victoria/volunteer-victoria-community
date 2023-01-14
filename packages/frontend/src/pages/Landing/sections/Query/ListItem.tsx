import { SvgIconComponent } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

type ListItemProps = React.PropsWithChildren<{
  Icon: SvgIconComponent;
}>;

export const ListItem = ({ Icon, children }: ListItemProps) => {
  return (
    <Stack component="li" direction="row" alignItems="center" spacing={2}>
      <Icon sx={{ fontSize: 32 }} color="primary" />
      <Typography variant="subtitle1">{children}</Typography>
    </Stack>
  );
};
