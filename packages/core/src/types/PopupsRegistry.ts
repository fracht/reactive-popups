import { Popup } from './Popup';
import { PopupProps } from './PopupProps';

export type PopupsRegistry<P extends PopupProps> = {
    popups: Record<number, Popup<P>>;
};
