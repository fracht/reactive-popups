import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';

const uniqueKey = '_isDefault';

export class DefaultPopup<P> extends Popup<P> {
    public [uniqueKey] = true;

    constructor(
        PopupComponent: ComponentType<P>,
        props: P,
        popupIdentifier: PopupIdentifier
    ) {
        super(PopupComponent, props, popupIdentifier);
    }
}

export const isDefaultPopup = (
    popup: Popup<unknown>
): popup is DefaultPopup<unknown> => uniqueKey in popup;
