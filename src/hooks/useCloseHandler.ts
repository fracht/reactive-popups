import { useCallback, useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export const useCloseHandler = (
    close?: () => void | Promise<void>
): (() => void) => {
    const { setCloseHandler, unmount } = usePopupsContext();

    const popupIdentifier = usePopupIdentifier();

    const unmountPopup = useCallback(() => {
        unmount(popupIdentifier);
    }, [popupIdentifier, unmount]);

    useEffect(() => {
        setCloseHandler(popupIdentifier, close);
    }, [setCloseHandler, popupIdentifier, close]);

    return unmountPopup;
};
