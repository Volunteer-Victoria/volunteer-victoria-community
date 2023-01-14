import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const UnauthenticatedOptions = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        variant="outlined"
        component={Link}
        to="opportunities"
        relative="route"
        sx={{
          ml: 2,
        }}
      >
        VIEW OPPORTUNITIES
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="login"
        relative="route"
        sx={{
          ml: 2,
        }}
      >
        LOG IN
      </Button>
    </Stack>
  );
};
