import { createContext } from "react";
import { PopupsContextType } from "../typings/PopupsContextType";

export const PopupsContext = createContext<PopupsContextType | undefined>(
    undefined
);
