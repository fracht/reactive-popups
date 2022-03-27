import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { usePopupsFactory } from './usePopupsFactory';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';
import { PopupProps } from '../types/PopupProps';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type ResponsePopupProps<R> = {
    resolve: (value: R) => void;
    reject: (reason?: unknown) => void;
} & PopupProps;

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: PopupComponent<P & ResponsePopupProps<R>>,
    props: Pick<P, K>,
    group = DEFAULT_GROUP_SYMBOL
): UseResponsePopupBag<Omit<P, K | keyof ResponsePopupProps<R>>, R> => {
    const [create, destroy] = usePopupsFactory<P, K>(
        PopupComponent as PopupComponent<P>,
        props,
        group
    );

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K | keyof ResponsePopupProps<R>>) => {
            return new Promise<R>((resolve, reject) => {
                const id = create({
                    ...omittedProps,
                    resolve: (value) => {
                        resolve(value);
                        destroy(id);
                    },
                    reject: (reason?: unknown) => {
                        reject(reason);
                        destroy(id);
                    },
                } as P & ResponsePopupProps<R>);
            });
        },
        [create, destroy]
    );

    return waitResponse;
};
