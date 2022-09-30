import { ComponentType, useCallback, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { ResponsePopup } from '../types/ResponsePopup';
import { uuid } from '../utils/uuid';

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
    const { mount } = usePopupsContext();

    const popupIdentifier = useRef<PopupIdentifier>({
        id: uuid(),
        groupId: group.groupId,
    });

    const defaultClose = useCallback(() => {
        throw new Error(
            'useResponseHandler hook must be used in ResponsePopup, because it is mandatory to settle promise.'
        );
    }, []);

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K>) => {
            let popup: ResponsePopup<P, R> | null = null;

            const promise = new Promise<R>((resolve, reject) => {
                popup = new ResponsePopup(
                    PopupComponent,
                    {
                        ...props,
                        ...omittedProps,
                    } as P,
                    popupIdentifier.current,
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
        },
        [PopupComponent, defaultClose, mount, props]
    );

    return waitResponse;
};
