import { Link, LinkProps } from "react-router-dom";

export const ReturnLink = (props: LinkProps) => {
  return <Link {...props}>🔙 {props.children}</Link>;
};
