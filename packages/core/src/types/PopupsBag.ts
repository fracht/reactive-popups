import { ComponentType } from 'react';
import { Stock } from 'stocked';

import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    // private
    stock: Stock<PopupsRegistry>;

    // public
    add: <P extends PopupProps>(
        PopupComponent: ComponentType<P>,
        props?: Omit<P, keyof PopupProps>
    ) => number;
    open: (id: number) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
};
