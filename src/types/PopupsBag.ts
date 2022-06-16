import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupGroup } from '../components/PopupGroup';

export type PopupsBag = {
    mount: <P>(popup: Popup<P>) => PopupIdentifier;
    unmount: (popupIdentifier: PopupIdentifier) => void;

    getPopupsByGroup: (group: PopupGroup) => Array<Popup<unknown>>;
    getPopup: (popupIdentifier: PopupIdentifier) => Popup<unknown>;

    close: (popupIdentifier: PopupIdentifier) => void;
};
