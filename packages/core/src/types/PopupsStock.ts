import { Popup } from './Popup';
import { PopupProps } from './PopupProps';

export type PopupsStock<P extends PopupProps> = {
    popups: Popup<P>[];
};
