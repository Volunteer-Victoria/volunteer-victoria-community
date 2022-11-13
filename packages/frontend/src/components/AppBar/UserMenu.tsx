import { useAuth0 } from "@auth0/auth0-react";
import { Menu, MenuItem } from "@mui/material";

interface UserMenuProps {
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
  open: boolean;
}

export function UserMenu({ anchorEl, open, onClose }: UserMenuProps) {
  const { logout } = useAuth0();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
    >
      <MenuItem
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Logout
      </MenuItem>
    </Menu>
  );
}
