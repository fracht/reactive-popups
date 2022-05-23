import { useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export const useCloseHandler = (close?: () => void) => {
    const { setBeforeUnmount } = usePopupsContext();

    const popupIdentifier = usePopupIdentifier();

    useEffect(() => {
        setBeforeUnmount(popupIdentifier, close);
    }, [setBeforeUnmount, popupIdentifier, close]);
};
