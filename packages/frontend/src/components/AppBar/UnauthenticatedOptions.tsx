import { Button, Stack, Theme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export const UnauthenticatedOptions = () => {
  const isMedium = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        variant="outlined"
        component={Link}
        to="opportunities"
        relative="route"
      >
        {isMedium ? "VIEW OPPORTUNITIES" : "VIEW"}
      </Button>
      <Button variant="contained" component={Link} to="login" relative="route">
        LOG IN
      </Button>
    </Stack>
  );
};
