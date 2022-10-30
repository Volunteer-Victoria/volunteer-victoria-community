import { createContext, useState } from "react";

/** Temporary user interface while waiting for API gen */
interface User {
  name: string;
}

export interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {
    console.error("Non implemented function, should be overridden");
  },
});

type UserContextProviderProps = React.PropsWithChildren;
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>({ name: "Will" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
