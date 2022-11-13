import { User as UserData } from "@auth0/auth0-react";
import { createContext } from "react";

export interface IUserContext {
  data: UserData | undefined;
  id: string | undefined;
  permissions: string[];
}

export const UserContext = createContext<IUserContext>({
  data: undefined,
  id: undefined,
  permissions: [],
});
