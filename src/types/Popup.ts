import { ComponentType } from 'react';

import { PopupIdentifier } from './PopupIdentifier';
import { ResponseHandler } from '../hooks/useResponseHandler';

export type Popup<P> = {
    PopupComponent: ComponentType<P>;
    props: P;
    popupIdentifier: PopupIdentifier;
    isSettled: boolean;
    close?: () => void | Promise<void>;
} & Partial<ResponseHandler>;
