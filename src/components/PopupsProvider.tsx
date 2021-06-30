import React from "react";

import { PopupsContext } from "./PopupsContext";
import { usePopupsController } from "../hooks/usePopupsController";

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
