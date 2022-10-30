import { AppBar as MaterialAppBar, Toolbar, Typography } from "@mui/material";

export const AppBar = () => {
  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <Typography variant="h6">LOGO</Typography>
      </Toolbar>
    </MaterialAppBar>
  );
};
