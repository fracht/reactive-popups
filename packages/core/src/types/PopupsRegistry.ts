import { Popup } from './Popup';
import { PopupProps } from './PopupProps';

export type PopupsRegistry = Record<number, Popup<PopupProps>>;
