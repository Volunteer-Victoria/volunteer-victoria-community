import {
  AppBar as MaterialAppBar,
  Box,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useUser } from "../UserDataProvider/use-user";
import { AuthenticatedOptions } from "./AuthenticatedOptions";
import { UnauthenticatedOptions } from "./UnauthenticatedOptions";

export const AppBar = () => {
  const theme = useTheme();
  const user = useUser();

  return (
    <MaterialAppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.paper,
        py: 1,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} height="45px" alt="Volunteer Victoria" />
          </Link>
        </Box>
        {user.data ? <AuthenticatedOptions /> : <UnauthenticatedOptions />}
      </Toolbar>
    </MaterialAppBar>
  );
};
