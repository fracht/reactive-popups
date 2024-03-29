import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';

const uniqueKey = '_isDefault';

export class DefaultPopup<P> extends Popup<P> {
    public [uniqueKey] = true;

    constructor(
        PopupComponent: ComponentType<P>,
        props: P,
        popupIdentifier: PopupIdentifier,
        close: () => void | Promise<void>
    ) {
        super(PopupComponent, props, popupIdentifier, close);
    }
}

export const isDefaultPopup = (
    popup: Popup<object>
): popup is DefaultPopup<object> => uniqueKey in popup;
