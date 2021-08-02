import { createContext, useContext } from "react";
import invariant from "tiny-invariant";

export type ReactivePopupsContextType = {};

export const ReactivePopupsContext = createContext<
    ReactivePopupsContextType | undefined
>(undefined);

export const useReactivePopupsContext = () => {
    const context = useContext(ReactivePopupsContext);

    invariant(
        context,
        "Trying to access ReactivePopupsContext outside provider"
    );

    return context;
};
