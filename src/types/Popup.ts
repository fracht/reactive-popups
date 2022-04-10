import { PopupComponent } from './PopupComponent';
import { PopupProps } from './PopupProps';

export type Popup<P> = {
    PopupComponent: PopupComponent<P>;
    props: P;
    id: number;
} & PopupProps;
