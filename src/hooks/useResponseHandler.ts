import { useCallback, useMemo } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { RESPONSE_HANDLER_ERROR } from '../constants';
import { usePopupIdentifier } from '../utils/PopupIdentifierContext';

export type ResponseHandler = {
    resolve: (value: unknown | PromiseLike<unknown>) => void;
    reject: (reason?: unknown) => void;
};

export const useResponseHandler = (): ResponseHandler => {
    const { getPopup, close } = usePopupsContext();
    const popupIdentifier = usePopupIdentifier();

    const popup = useMemo(() => {
        const popup = getPopup(popupIdentifier);

        // TODO add prop to identify response popup type
        if (!popup.resolve || !popup.reject) {
            throw new Error(RESPONSE_HANDLER_ERROR);
        }

        return popup;
    }, [getPopup, popupIdentifier]);

    const resolve = useCallback(
        (value: unknown) => {
            popup.resolve!(value);
            close(popupIdentifier);
        },
        [close, popup.resolve, popupIdentifier]
    );

    const reject = useCallback(
        (reason?: unknown) => {
            popup.reject!(reason);
            close(popupIdentifier);
        },
        [close, popup.reject, popupIdentifier]
    );

    return { resolve, reject };
};
