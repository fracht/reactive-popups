import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupGroup } from '../components/PopupGroup';
import { ResponsePopupContextType } from '../utils/ResponsePopupContext';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: ComponentType<P>,
        props: P,
        group: PopupGroup,
        handler?: ResponsePopupContextType
    ) => PopupIdentifier;
    unmount: (popupIdentifier: PopupIdentifier) => void;
    getPopupsByGroup: (group: PopupGroup) => Array<Popup<unknown>>;
    close: (popupIdentifier: PopupIdentifier) => void;
    setCloseHandler: (
        popupIdentifier: PopupIdentifier,
        close?: () => void
    ) => void;
};
