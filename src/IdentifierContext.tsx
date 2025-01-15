import React, { createContext, type PropsWithChildren, useContext } from 'react';

import type { PopupIdentifier } from './PopupsContext';

const IdentifierContext = createContext<PopupIdentifier | undefined>(undefined);

export const IdentifierContextProvider = ({
	children,
	popupIdentifier,
}: PropsWithChildren<{
	popupIdentifier: PopupIdentifier;
}>) => {
	return <IdentifierContext.Provider value={popupIdentifier}>{children}</IdentifierContext.Provider>;
};

export const useIdentifier = () => {
	return useContext(IdentifierContext)!;
};
