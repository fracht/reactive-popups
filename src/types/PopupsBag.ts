import { Popup } from './Popup';
import { PopupComponent } from './PopupComponent';
import { PopupProps } from './PopupProps';
import { PopupGroup } from '../components/PopupGroup';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group: PopupGroup,
        customProps?: Partial<PopupProps>
    ) => number;
    show: (id: number, group: PopupGroup) => void;
    unmount: (id: number, group: PopupGroup) => void;
    hide: (id: number, group: PopupGroup) => void;
    getPopupsByGroup: (group: PopupGroup) => Array<Popup<PopupProps>>;
};
