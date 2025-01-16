import { useCallback, useEffect } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { useIdentifier } from './IdentifierContext';
import { PopupsContext } from './PopupsContext';

export const useCloseHandler = (close?: () => void | Promise<void>): (() => void) => {
	const { getPopup, unmount } = useSafeContext(PopupsContext);

	const popupIdentifier = useIdentifier();

	const unmountPopup = useCallback(() => {
		unmount(popupIdentifier);
	}, [popupIdentifier, unmount]);

	useEffect(() => {
		const popup = getPopup(popupIdentifier);

		if (popup === null) {
			throw new Error('`useCloseHandler` hook must be called only from popups.');
		}

		if (close) {
			popup.close = close;
		}
	}, [popupIdentifier, close, getPopup]);

	return unmountPopup;
};
