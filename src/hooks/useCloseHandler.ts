import { useCallback, useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { isDefaultPopup } from '../types/DefaultPopup';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export const useCloseHandler = (
    close?: () => void | Promise<void>
): (() => void) => {
    const { getPopup, unmount } = usePopupsContext();

    const popupIdentifier = usePopupIdentifier();

    const unmountPopup = useCallback(() => {
        unmount(popupIdentifier);
    }, [popupIdentifier, unmount]);

    useEffect(() => {
        const popup = getPopup(popupIdentifier);

        if (!isDefaultPopup(popup!)) {
            throw new Error(
                'useCloseHandler hook must be used only in popups created with usePopupsFactory.'
            );
        }

        if (close) {
            popup.setCloseHandler(close);
        }
    }, [popupIdentifier, close, getPopup]);

    return unmountPopup;
};
