import { PopupComponent } from './PopupComponent';
import { PopupIdentifier } from './PopupIdentifier';

export type Popup<P> = {
    PopupComponent: PopupComponent<P>;
    props: P;
    popupIdentifier: PopupIdentifier;
    close?: () => void;
};
