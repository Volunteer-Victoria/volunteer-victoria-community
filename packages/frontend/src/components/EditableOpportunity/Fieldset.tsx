import { Box, Typography } from "@mui/material";

type FieldsetProps = React.PropsWithChildren<{
  title: string;
}>;

export const Fieldset = ({ title, children }: FieldsetProps) => {
  return (
    <Box
      component="fieldset"
      sx={{
        border: 0,
        p: 0,
      }}
    >
      <Typography
        component="legend"
        variant="h2"
        sx={{
          pb: { xs: 1, lg: 4 },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};
