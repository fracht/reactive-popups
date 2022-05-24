import { useCallback, useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export const useCloseHandler = (close?: () => void): (() => void) => {
    const { setBeforeUnmount, unmount } = usePopupsContext();

    const popupIdentifier = usePopupIdentifier();

    const unmountPopup = useCallback(() => {
        unmount(popupIdentifier);
    }, [popupIdentifier, unmount]);

    useEffect(() => {
        setBeforeUnmount(popupIdentifier, close);
    }, [setBeforeUnmount, popupIdentifier, close]);

    return unmountPopup;
};
