import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupGroup } from '../components/PopupGroup';
import { ResponseHandler } from '../hooks/useResponseHandler';

export type PopupsBag = {
    mount: <P>(
        PopupComponent: ComponentType<P>,
        props: P,
        group: PopupGroup,
        handler?: ResponseHandler
    ) => PopupIdentifier;
    unmount: (popupIdentifier: PopupIdentifier) => void;

    getPopupsByGroup: (group: PopupGroup) => Array<Popup<unknown>>;
    getPopup: (popupIdentifier: PopupIdentifier) => Popup<unknown>;

    close: (popupIdentifier: PopupIdentifier) => void;
    setCloseHandler: (
        popupIdentifier: PopupIdentifier,
        close?: () => void | Promise<void>
    ) => void;
};
