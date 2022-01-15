import { ComponentType, useCallback } from 'react';
import { Stock } from 'stocked';

import { Popup } from '../types/Popup';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = ({
    paths,
    setValue,
    getValue,
}: Stock<PopupsRegistry>): PopupsBag => {
    const add = useCallback(
        <P extends PopupProps>(
            PopupComponent: ComponentType<P>,
            props: Omit<P, 'id'> = {} as P
        ) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
            };

            setValue(
                paths.popups[id],
                newPopup as unknown as Popup<PopupProps>
            );

            return id;
        },
        [setValue, paths]
    );

    const open = useCallback(
        (id: number) => {
            setValue(paths.popups[id].visible, true);
        },
        [paths, setValue]
    );

    const remove = useCallback(
        (id: number) => {
            // FIXME after remove all popups will rerender
            const popups = getValue(paths.popups);
            delete popups[id];
            setValue(paths.popups, popups);
        },
        [setValue, getValue, paths]
    );

    const close = useCallback(
        (id: number) => {
            setValue(paths.popups[id].visible, false);
        },
        [paths, setValue]
    );

    return {
        add,
        open,
        close,
        remove,
    };
};
