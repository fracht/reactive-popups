import { ComponentType } from 'react';

import { ControlledPopupIdentifier } from './PopupIdentifier';

export abstract class Popup<P = {}> {
    constructor(
        public PopupComponent: ComponentType<P>,
        public props: P,
        public popupIdentifier: ControlledPopupIdentifier,
        public close: () => void | Promise<void>
    ) {}

    public setCloseHandler: (close: () => void | Promise<void>) => void = (
        close
    ) => {
        this.close = close;
    };
}
