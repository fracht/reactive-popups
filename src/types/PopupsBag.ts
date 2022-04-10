import { Popup } from './Popup';
import { PopupComponent } from './PopupComponent';
import { PopupProps } from './PopupProps';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group?: symbol,
        customProps?: Partial<PopupProps>
    ) => number;
    show: (id: number, group?: symbol) => void;
    unmount: (id: number, group?: symbol) => void;
    hide: (id: number, group?: symbol) => void;
    getPopupsByGroup: (group?: symbol) => Array<Popup<PopupProps>>;
};
