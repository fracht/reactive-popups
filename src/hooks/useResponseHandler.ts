import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PROMISE_NOT_SETTLED, RESPONSE_HANDLER_BAD_USE } from '../constants';
import { isResponsePopup, ResponsePopup } from '../types/ResponsePopup';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export type ResponseHandler = {
    resolve: (value: unknown | PromiseLike<unknown>) => void;
    reject: (reason?: unknown) => void;
    unmount: () => void;
};

export const useResponseHandler = (close: () => void): ResponseHandler => {
    const {
        getPopup,
        close: closePopup,
        unmount: unmountPopup,
    } = usePopupsContext();
    const popupIdentifier = usePopupIdentifier();

    const popupRef = useRef<ResponsePopup<object, unknown> | null>(null);

    const resolve = useCallback(
        (value: unknown) => {
            popupRef.current!.resolve!(value);
            closePopup(popupIdentifier);
        },
        [closePopup, popupIdentifier]
    );

    const reject = useCallback(
        (reason?: unknown) => {
            popupRef.current!.reject!(reason);
            closePopup(popupIdentifier);
        },
        [closePopup, popupIdentifier]
    );

    const unmount = useCallback(() => {
        if (!popupRef.current!.isSettled!) {
            throw new Error(PROMISE_NOT_SETTLED);
        }

        unmountPopup(popupIdentifier);
    }, [popupIdentifier, unmountPopup]);

    useEffect(() => {
        const popup = getPopup(popupIdentifier);

        if (!isResponsePopup(popup)) {
            throw new Error(RESPONSE_HANDLER_BAD_USE);
        }

        popup.setCloseHandler(close);
        popupRef.current = popup;
    }, [getPopup, popupIdentifier, close]);

    return { resolve, reject, unmount };
};
