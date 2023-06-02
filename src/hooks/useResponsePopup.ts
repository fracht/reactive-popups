import { ComponentType, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid/non-secure';

import { useEvent } from './useEvent';
import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { ResponsePopup } from '../types/ResponsePopup';

export type UseResponsePopupBag<
    P,
    K extends keyof P,
    R
> = OptionalParamFunction<Omit<P, K>, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UseResponsePopupBag<P, K, R> => {
    const { mount, unmount } = usePopupsContext();

    const popupIdentifierRef = useRef<PopupIdentifier>({
        id: nanoid(),
        groupId: group.groupId,
    });

    const defaultClose = useCallback(() => {
        unmount(popupIdentifierRef.current);
    }, [unmount]);

    const waitResponse = useEvent((omittedProps?: Omit<P, K>) => {
        let popup: ResponsePopup<P, R> | null = null;

        const promise = new Promise<R>((resolve, reject) => {
            popup = new ResponsePopup(
                PopupComponent,
                {
                    ...props,
                    ...omittedProps,
                } as P,
                popupIdentifierRef.current,
                defaultClose,
                resolve,
                reject
            );

            mount(popup);
        });

        promise.finally(() => {
            popup!.isSettled = true;
        });

        return promise;
    });

    return waitResponse;
};
