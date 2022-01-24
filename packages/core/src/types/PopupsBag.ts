import { ComponentType } from 'react';

import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    popups: PopupsRegistry;
    add: <P extends PopupProps>(
        PopupComponent: ComponentType<P>,
        props?: Omit<P, keyof PopupProps>
    ) => number;
    open: (id: number) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
    empty: () => boolean;
};
