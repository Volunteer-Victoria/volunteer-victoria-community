import { Grid, Typography } from "@mui/material";

interface DefinitionItemProps {
  title: string;
  details: string;
}

export const DefinitionItem = ({ title, details }: DefinitionItemProps) => {
  if (!details) return null;

  return (
    <Grid container>
      <Grid item component="dt">
        <Typography fontWeight="bold">{title}:&nbsp;</Typography>
      </Grid>
      <Grid item component="dd">
        <Typography>{details}</Typography>
      </Grid>
    </Grid>
  );
};
