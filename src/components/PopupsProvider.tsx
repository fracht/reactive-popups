import React from "react";
import useConstant from "use-constant";
import { PopupsController } from "../typings";
import { PopupsContext } from "./PopupsContext";

export const PopupsProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const controller = useConstant(() => new PopupsController());

    return (
        <React.Fragment>
            <PopupsContext.Provider
                value={{
                    controller,
                }}
            >
                {children}
            </PopupsContext.Provider>

            {Array.from(controller.popups.values()).map((p) => p.render())}
        </React.Fragment>
    );
};
