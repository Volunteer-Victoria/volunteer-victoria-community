import jwtDecode from "jwt-decode";

export const readToken = (accessToken: string) => {
  const { permissions, sub: id } = jwtDecode<{
    permissions: string[];
    sub: string;
  }>(accessToken);
  return { permissions, id };
};
