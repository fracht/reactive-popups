import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type ResponsePopupProps<R> = {
    resolve: (value: R) => void;
    reject: (reason?: unknown) => void;
};

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: PopupComponent<P & ResponsePopupProps<R>>,
    props: Pick<P, K>,
    group = DEFAULT_GROUP_SYMBOL
): UseResponsePopupBag<Omit<P, K | keyof ResponsePopupProps<R>>, R> => {
    const { mount, unmount } = usePopupsContext();

    const open = useCallback(
        (omittedProps?: Omit<P, K | keyof ResponsePopupProps<R>>) => {
            return new Promise<R>((resolve, reject) => {
                const id = mount(
                    PopupComponent,
                    {
                        ...props,
                        ...omittedProps,
                        resolve: (value) => {
                            resolve(value);
                            unmount(id, group);
                        },
                        reject: (reason?: unknown) => {
                            reject(reason);
                            unmount(id, group);
                        },
                    } as P & ResponsePopupProps<R>,
                    group,
                    {
                        visible: true,
                        close: () => {
                            reject();
                            unmount(id, group);
                        },
                    }
                );
            });
        },
        [PopupComponent, mount, group, props, unmount]
    );

    return open;
};
