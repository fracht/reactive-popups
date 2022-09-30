import { ComponentType } from 'react';

import { PopupIdentifier } from './PopupIdentifier';

export abstract class Popup<P = {}> {
    constructor(
        public PopupComponent: ComponentType<P>,
        public props: P,
        public popupIdentifier: PopupIdentifier,
        public close: () => void | Promise<void>
    ) {}

    public setCloseHandler: (close: () => void | Promise<void>) => void = (
        close
    ) => {
        this.close = close;
    };
}
