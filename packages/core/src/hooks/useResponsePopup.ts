import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type ResponsePopupProps<R> = {
    resolve: (value: R) => void;
    reject: (reason?: unknown) => void;
};

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, R>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: PopupComponent<P & ResponsePopupProps<R>>,
    props: Pick<P, K>,
    group = DEFAULT_GROUP_SYMBOL
): UseResponsePopupBag<Omit<P, K | keyof ResponsePopupProps<R>>, R> => {
    const { add, remove } = usePopupsContext();

    const unmountPopup = useCallback(
        (id: number) => {
            remove(id, group);
        },
        [group, remove]
    );

    const open = useCallback(
        (omittedProps?: Omit<P, K | keyof ResponsePopupProps<R>>) => {
            return new Promise<R>((resolve, reject) => {
                const id = add(
                    PopupComponent,
                    {
                        ...props,
                        ...omittedProps,
                        resolve: (value) => {
                            resolve(value);
                            unmountPopup(id);
                        },
                        reject: (reason?: unknown) => {
                            reject(reason);
                            unmountPopup(id);
                        },
                    } as P & ResponsePopupProps<R>,
                    group,
                    {
                        visible: true,
                        close: () => {
                            reject('Response popup has been unmounted.');
                            unmountPopup(id);
                        },
                    }
                );
            });
        },
        [PopupComponent, add, group, props, unmountPopup]
    );

    return open;
};
