import { PopupComponent } from './PopupComponent';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupProps } from './PopupProps';

export type Popup<P> = {
    PopupComponent: PopupComponent<P>;
    props: P;
    popupIdentifier: PopupIdentifier;
    close?: () => void;
} & PopupProps;
