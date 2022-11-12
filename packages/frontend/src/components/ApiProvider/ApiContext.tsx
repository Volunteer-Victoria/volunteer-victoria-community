import { createContext } from "react";
import { DefaultApi } from "../../api";

export const ApiContext = createContext(new DefaultApi());
