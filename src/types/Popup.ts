import { ComponentType } from 'react';

import { PopupIdentifier } from './PopupIdentifier';
import { ResponsePopupContextType } from '../utils/ResponsePopupContext';

export type Popup<P> = {
    PopupComponent: ComponentType<P>;
    props: P;
    popupIdentifier: PopupIdentifier;
    close?: () => void;
} & Partial<ResponsePopupContextType>;
