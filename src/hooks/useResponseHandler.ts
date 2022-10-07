import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { isResponsePopup, ResponsePopup } from '../types/ResponsePopup';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export type ResponseHandler<R> = {
    resolve: (value: R | PromiseLike<R>) => void;
    reject: (reason?: unknown) => void;
    unmount: () => void;
};

export const useResponseHandler = <R>(
    close: () => void
): ResponseHandler<R> => {
    const {
        getPopup,
        close: closePopup,
        unmount: unmountPopup,
    } = usePopupsContext();
    const popupIdentifier = usePopupIdentifier();

    const popupRef = useRef<ResponsePopup<object, R> | null>(null);

    const resolve = useCallback(
        (value: R | PromiseLike<R>) => {
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
        if (!popupRef.current!.isSettled) {
            throw new Error(
                'Promise from ResponsePopup was not settled (memory leak).'
            );
        }

        unmountPopup(popupIdentifier);
    }, [popupIdentifier, unmountPopup]);

    useEffect(() => {
        const popup = getPopup(popupIdentifier);

        if (!isResponsePopup(popup!)) {
            throw new Error(
                'useResponseHandler hook must be used only in popups created with useResponsePopup.'
            );
        }

        popup.setCloseHandler(close);
        popupRef.current = popup;
    }, [getPopup, popupIdentifier, close]);

    return { resolve, reject, unmount };
};
