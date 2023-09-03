import { ComponentType } from 'react';

import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';

export class ResponsePopup<P, R> extends Popup<P> {
    public isSettled = false;

    constructor(
        PopupComponent: ComponentType<P>,
        props: P,
        popupIdentifier: PopupIdentifier,
        close: () => void | Promise<void>,
        public resolve: (value: R | PromiseLike<R>) => void,
        public reject: (reason?: unknown) => void,
    ) {
        super(PopupComponent, props, popupIdentifier, close);
    }
}

export const isResponsePopup = (
    popup: Popup<object>,
): popup is ResponsePopup<object, unknown> => popup instanceof ResponsePopup;
