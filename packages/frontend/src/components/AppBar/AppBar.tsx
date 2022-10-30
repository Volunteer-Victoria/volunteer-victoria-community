import {
  AppBar as MaterialAppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useUser } from "../../hooks/use-user/use-user";

export const AppBar = () => {
  const theme = useTheme();
  const { user } = useUser();
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
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} height="45px" alt="Volunteer Victoria" />
          </Box>
          {user && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {user.name && user.name.length > 0 && (
                <Avatar>{user.name[0]}</Avatar>
              )}
              <Button
                variant="outlined"
                component={Link}
                to="opportunities/create"
                relative="route"
                sx={{
                  ml: 2,
                }}
              >
                Post an opportunity
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </MaterialAppBar>
  );
};
