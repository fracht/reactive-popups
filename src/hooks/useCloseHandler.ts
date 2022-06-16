import { useCallback, useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { CLOSE_HANDLER_BAD_USE } from '../constants';
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

        if (!isDefaultPopup(popup)) {
            throw new Error(CLOSE_HANDLER_BAD_USE);
        }

        if (close) {
            popup.setCloseHandler(close);
        }
        // BUG with throwing error if getPopup is in dependency list
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupIdentifier, close]);

    return unmountPopup;
};
