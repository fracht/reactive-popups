import { Popup } from './Popup';
import { PopupComponent } from './PopupComponent';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupProps } from './PopupProps';
import { PopupGroup } from '../components/PopupGroup';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: PopupComponent<P>,
        props: P,
        group: PopupGroup
    ) => PopupIdentifier;
    getPopupsByGroup: (group: PopupGroup) => Array<Popup<PopupProps>>;
    close: (popupIdentifier: PopupIdentifier) => void;
    setBeforeUnmount: (
        popupIdentifier: PopupIdentifier,
        close?: () => void
    ) => void;
};
