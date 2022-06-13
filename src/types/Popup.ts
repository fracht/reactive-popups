import { ComponentType } from 'react';

import { PopupIdentifier } from './PopupIdentifier';
import { CLOSE_NOT_IMPLEMENTED } from '../constants';

export abstract class Popup<P> {
    constructor(
        public PopupComponent: ComponentType<P>,
        public props: P,
        public popupIdentifier: PopupIdentifier
    ) {}

    public close: () => void | Promise<void> = () => {
        throw new Error(CLOSE_NOT_IMPLEMENTED);
    };

    public setCloseHandler: (close: () => void | Promise<void>) => void = (
        close
    ) => {
        this.close = close;
    };
}
