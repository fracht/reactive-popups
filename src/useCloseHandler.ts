import { useCallback, useEffect } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { isDefaultPopup } from './DefaultPopup';
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

		if (popup === null || !isDefaultPopup(popup)) {
			throw new Error(
				'`useCloseHandler` hook must be called only from default popups created by `usePopup` or `usePopupsFactory`.',
			);
		}

		if (close) {
			popup.close = close;
		}
	}, [popupIdentifier, close, getPopup]);

	return unmountPopup;
};
