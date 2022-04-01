import { Popup } from './Popup';
import { PopupProps } from './PopupProps';

export type PopupsRegistry = Record<symbol, Record<number, Popup<PopupProps>>>;
