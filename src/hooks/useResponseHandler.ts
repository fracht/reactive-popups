import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { RESPONSE_HANDLER_ERROR } from '../constants';
import { Popup } from '../types/Popup';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export type ResponseHandler = {
    resolve: (value: unknown | PromiseLike<unknown>) => void;
    reject: (reason?: unknown) => void;
};

export const useResponseHandler = (): ResponseHandler => {
    const { getPopup, close } = usePopupsContext();
    const popupIdentifier = usePopupIdentifier();

    const popupRef = useRef<Popup<unknown> | null>(null);

    const resolve = useCallback(
        (value: unknown) => {
            popupRef.current!.resolve!(value);
            close(popupIdentifier);
        },
        [close, popupIdentifier]
    );

    const reject = useCallback(
        (reason?: unknown) => {
            popupRef.current!.reject!(reason);
            close(popupIdentifier);
        },
        [close, popupIdentifier]
    );

    useEffect(() => {
        const popup = getPopup(popupIdentifier);

        if (popup.isSettled) {
            throw new Error(RESPONSE_HANDLER_ERROR);
        }

        popupRef.current = popup;
    }, [getPopup, popupIdentifier]);

    return { resolve, reject };
};
