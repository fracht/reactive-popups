import { PopupComponent } from './PopupComponent';
import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    popups: PopupsRegistry;
    add: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group?: symbol,
        customProps?: Partial<PopupProps>,
        destroyOnClose?: boolean
    ) => number;
    open: (id: number, group?: symbol) => void;
    remove: (id: number, group?: symbol) => void;
    close: (id: number, group?: symbol) => void;
    empty: (group?: symbol) => boolean;
};
