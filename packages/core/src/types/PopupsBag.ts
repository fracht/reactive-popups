import { PopupComponent } from './PopupComponent';
import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    popups: PopupsRegistry;
    mount: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group?: symbol,
        customProps?: Partial<PopupProps>
    ) => number;
    open: (id: number, group?: symbol) => void;
    unmount: (id: number, group?: symbol) => void;
    close: (id: number, group?: symbol) => void;
    empty: (group?: symbol) => boolean;
};
