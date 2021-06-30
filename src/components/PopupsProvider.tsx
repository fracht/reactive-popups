import React from "react";
import { usePopupsController } from "../hooks/usePopupsController";
import { PopupsContext } from "./PopupsContext";

export const PopupsProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const controller = usePopupsController();

    return (
        <React.Fragment>
            <PopupsContext.Provider value={controller}>
                {children}
            </PopupsContext.Provider>

            {controller.popups.map((p) => p.render())}
        </React.Fragment>
    );
};
