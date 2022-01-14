import { ComponentType } from 'react';
import { Stock } from 'stocked';

import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag<P extends PopupProps> = {
    // private
    stock: Stock<PopupsRegistry<P>>;

    // public
    add: (PopupComponent: ComponentType<P>, props?: Omit<P, 'id'>) => number;
    open: (id: number) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
};
