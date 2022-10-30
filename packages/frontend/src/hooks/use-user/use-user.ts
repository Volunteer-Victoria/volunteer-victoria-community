import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("usePublishEvent must be used in an EventBus context");
  }

  return context;
};
