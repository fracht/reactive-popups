import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ResponsePopupContextType = {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
};

const ResponsePopupContext = createContext<ResponsePopupContextType | null>(
    null
);

export type ResponsePopupProviderProps = PropsWithChildren<
    Partial<ResponsePopupContextType>
>;

export const ResponsePopupProvider = ({
    children,
    resolve,
    reject,
}: ResponsePopupProviderProps) => {
    return (
        <ResponsePopupContext.Provider
            value={resolve && reject ? { resolve, reject } : null}
        >
            {children}
        </ResponsePopupContext.Provider>
    );
};

export const useResponsePopupContext = (): ResponsePopupContextType | null => {
    return useContext(ResponsePopupContext);
};
