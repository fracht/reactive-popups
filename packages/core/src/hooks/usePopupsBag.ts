import { ComponentType, useCallback } from 'react';
import { useStock } from 'stocked';

import { Popup } from '../types/Popup';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsStock } from '../types/PopupsStock';
import { uuid } from '../utils/uuid';

export const usePopupsBag = <P extends PopupProps>(): PopupsBag<P> => {
    const stock = useStock<PopupsStock<P>>({
        initialValues: {
            popups: [],
        },
    });

    const { paths, setValue } = stock;

    const add = useCallback(
        (PopupComponent: ComponentType<P>, props: Omit<P, 'id'> = {} as P) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
            };

            setValue(paths.popups, (prevState) => {
                prevState.push(newPopup);
                return prevState;
            });

            return id;
        },
        [setValue, paths]
    );

    const open = useCallback(
        (id: number) => {
            setValue(paths.popups, (prevState) => {
                return prevState.map((popup) => {
                    if (popup.id === id) {
                        popup.visible = true;
                    }

                    return popup;
                });
            });
        },
        [paths, setValue]
    );

    const remove = useCallback(
        (id: number) => {
            setValue(paths.popups, (prevState) => {
                return prevState.filter((popup) => popup.id !== id);
            });
        },
        [setValue, paths]
    );

    const close = useCallback(
        (id: number) => {
            setValue(paths.popups, (prevState) => {
                return prevState.map((popup) => {
                    if (popup.id === id) {
                        popup.visible = false;
                    }

                    return popup;
                });
            });
        },
        [paths, setValue]
    );

    return {
        stock,
        add,
        open,
        close,
        remove,
    };
};
