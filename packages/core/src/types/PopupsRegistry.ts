import { Popup } from './Popup';
import { PopupProps } from './PopupProps';

export type PopupsRegistry = {
    popups: Record<number, Popup<PopupProps>>;
};
