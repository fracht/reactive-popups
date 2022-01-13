import { ComponentType } from 'react';

import { PopupProps } from './PopupProps';

export type Popup<P extends PopupProps> = {
    PopupComponent: ComponentType<P>;
    props: Omit<P, keyof PopupProps>;
    visible: boolean;
} & PopupProps;
