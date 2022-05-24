import { Popup } from './Popup';
import { PopupComponent } from './PopupComponent';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupGroup } from '../components/PopupGroup';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group: PopupGroup
    ) => PopupIdentifier;
    unmount: (popupIdentifier: PopupIdentifier) => void;
    getPopupsByGroup: (group: PopupGroup) => Array<Popup<unknown>>;
    close: (popupIdentifier: PopupIdentifier) => void;
    setBeforeUnmount: (
        popupIdentifier: PopupIdentifier,
        close?: () => void
    ) => void;
};
