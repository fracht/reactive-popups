import { ComponentType } from 'react';

import { OmittedProps } from './OmittedProps';
import { Popup } from './Popup';

export type PopupsBag<P extends OmittedProps> = {
    popups: Popup<P>[];
    visiblePopups: Set<number>;

    add: (PopupComponent: ComponentType<P>, props?: Omit<P, 'id'>) => number;
    open: (id: number) => void;

    remove: (id: number) => void;
    close: (id: number) => void;
};
