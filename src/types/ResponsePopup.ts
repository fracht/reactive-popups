import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';

const isSettledKey = 'isSettled';

export class ResponsePopup<P, R> extends Popup<P> {
    public [isSettledKey] = false;

    constructor(
        PopupComponent: ComponentType<P>,
        props: P,
        popupIdentifier: PopupIdentifier,
        public resolve: (value: R | PromiseLike<R>) => void,
        public reject: (reason?: unknown) => void
    ) {
        super(PopupComponent, props, popupIdentifier);
    }
}

export const isResponsePopup = (
    popup: Popup<unknown>
): popup is ResponsePopup<unknown, unknown> => isSettledKey in popup;
