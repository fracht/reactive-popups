import { createContext } from "react";
import { PopupsController } from "../typings";

export const PopupsContext = createContext<PopupsController | undefined>(
    undefined
);
