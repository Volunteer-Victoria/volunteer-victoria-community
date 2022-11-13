import {
  AppBar as MaterialAppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useUser } from "../UserDataProvider/use-user";
import { AvatarButton } from "./AvatarButton";
import { UserMenu } from "./UserMenu";

export const AppBar = () => {
  const theme = useTheme();
  const user = useUser();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <MaterialAppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        py: 1,
        px: 0,
      }}
    >
      <UserMenu
        open={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        anchorEl={anchorEl}
      />
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src={logo} height="45px" alt="Volunteer Victoria" />
            </Link>
          </Box>
          {user.data && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                component={Link}
                to="opportunities/create"
                relative="route"
                sx={{
                  ml: 2,
                }}
              >
                {isSmall ? "Post" : "Post an opportunity"}
              </Button>
              <AvatarButton onClick={handleClick} />
            </Stack>
          )}
        </Toolbar>
      </Container>
    </MaterialAppBar>
  );
};
