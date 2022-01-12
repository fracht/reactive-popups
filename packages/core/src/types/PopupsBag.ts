import { OmittedProps } from './OmittedProps';
import { Popup } from './Popup';

export type PopupsBag<P extends OmittedProps> = {
    popups: Popup<P>[];

    add: () => number;
    open: (id: number) => void;

    remove: (id: number) => void;
    close: (id: number) => void;
};
