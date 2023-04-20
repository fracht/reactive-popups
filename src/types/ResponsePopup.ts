import { ComponentType } from 'react';

import { Popup } from './Popup';
import { ControlledPopupIdentifier } from './PopupIdentifier';

const isSettledKey = 'isSettled';

export class ResponsePopup<P, R> extends Popup<P> {
    public [isSettledKey] = false;

    constructor(
        PopupComponent: ComponentType<P>,
        props: P,
        popupIdentifier: ControlledPopupIdentifier,
        close: () => void | Promise<void>,
        public resolve: (value: R | PromiseLike<R>) => void,
        public reject: (reason?: unknown) => void
    ) {
        super(PopupComponent, props, popupIdentifier, close);
    }
}

export const isResponsePopup = (
    popup: Popup<object>
): popup is ResponsePopup<object, unknown> => isSettledKey in popup;
