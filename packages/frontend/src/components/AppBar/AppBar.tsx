import {
  AppBar as MaterialAppBar,
  Container,
  Toolbar,
  useTheme,
} from "@mui/material";
import logo from "../../assets/logo.png";

export const AppBar = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <MaterialAppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        py: 1,
        px: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <img src={logo} height="45px" alt="Volunteer Victoria" />
        </Toolbar>
      </Container>
    </MaterialAppBar>
  );
};
