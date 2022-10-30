import { Link, LinkProps } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const ReturnLink = (props: LinkProps) => {
  return (
    <MuiLink component={Link} underline="hover" fontWeight="medium" {...props}>
      <ArrowBackIosIcon sx={{ verticalAlign: "bottom" }} />
      {props.children}
    </MuiLink>
  );
};
