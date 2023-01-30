import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AvatarButton } from "./AvatarButton";
import { UserMenu } from "./UserMenu";

export const AuthenticatedOptions = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setUserMenuOpen((prev) => !prev);
  };
  return (
    <>
      <UserMenu
        open={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        anchorEl={anchorEl}
      />
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
    </>
  );
};
