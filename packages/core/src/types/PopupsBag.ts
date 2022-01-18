import { ComponentType } from 'react';

import { PopupProps } from './PopupProps';

export type PopupsBag = {
    add: <P extends PopupProps>(
        PopupComponent: ComponentType<P>,
        props?: Omit<P, keyof PopupProps>
    ) => number;
    open: (id: number) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
};
