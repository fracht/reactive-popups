import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ResponsePopupContextType = {
    resolve?: (value: unknown) => void;
    reject?: (reason?: unknown) => void;
};

const ResponsePopupContext = createContext<
    ResponsePopupContextType | undefined
>(undefined);

export type ResponsePopupProviderProps =
    PropsWithChildren<ResponsePopupContextType>;

export const ResponsePopupProvider = ({
    children,
    resolve,
    reject,
}: ResponsePopupProviderProps) => {
    return (
        <ResponsePopupContext.Provider value={{ resolve, reject }}>
            {children}
        </ResponsePopupContext.Provider>
    );
};

export const useResponsePopupContext =
    (): Required<ResponsePopupContextType> => {
        return useContext(
            ResponsePopupContext
        )! as Required<ResponsePopupContextType>;
    };
