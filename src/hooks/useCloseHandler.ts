import { useEffect } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupIdentifier } from '../types/PopupIdentifier';

export const useCloseHandler = (
    popupIdentifier: PopupIdentifier,
    close: () => void
) => {
    const { setPopupCloseCallback } = usePopupsContext();

    useEffect(() => {
        setPopupCloseCallback(popupIdentifier, close);
    }, [setPopupCloseCallback, popupIdentifier, close]);
};
