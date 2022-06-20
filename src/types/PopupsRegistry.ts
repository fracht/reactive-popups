import { Popup } from './Popup';

export type PopupsRegistry = Record<symbol, Record<number, Popup<object>>>;
