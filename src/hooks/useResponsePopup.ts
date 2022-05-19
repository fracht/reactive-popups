import { useCallback } from 'react';

import { usePopupsFactory } from './usePopupsFactory';
import { PopupGroup } from '../components/PopupGroup';
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
    group: PopupGroup
): UseResponsePopupBag<Omit<P, K | keyof ResponsePopupProps<R>>, R> => {
    const create = usePopupsFactory<P, K>(
        PopupComponent as PopupComponent<P>,
        props,
        group
    );

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K | keyof ResponsePopupProps<R>>) => {
            return new Promise<R>((resolve, reject) => {
                const destroy = create({
                    ...omittedProps,
                    resolve: (value) => {
                        resolve(value);
                        destroy();
                    },
                    reject: (reason?: unknown) => {
                        reject(reason);
                        destroy();
                    },
                } as P & ResponsePopupProps<R>);
            });
        },
        [create]
    );

    return waitResponse;
};
