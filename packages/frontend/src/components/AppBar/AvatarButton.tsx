import { IconButton, IconButtonProps, Avatar } from "@mui/material";
import { useUser } from "../UserDataProvider/use-user";

type AvatarButtonProps = Pick<IconButtonProps, "onClick">;

export const AvatarButton = ({ onClick }: AvatarButtonProps) => {
  const user = useUser();

  const initial =
    user?.data?.name && user.data.name.length > 0 ? user.data.name[0] : "?";

  return (
    <IconButton onClick={onClick} aria-label="Toggle user menu">
      <Avatar
        src={user?.data?.picture}
        alt={user?.data?.name ?? "User profile picture"}
      >
        {initial}
      </Avatar>
    </IconButton>
  );
};
