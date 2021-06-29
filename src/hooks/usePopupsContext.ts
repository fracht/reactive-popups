import { useContext } from "react";
import invariant from "invariant";

import { PopupsContext } from "../components";

export const usePopupsContext = () => {
    const context = useContext(PopupsContext);

    invariant(
        context,
        "You are trying to access popups outside PopupsContext. Please, wrap your whole application in PopupsProvider"
    );

    return context;
};
