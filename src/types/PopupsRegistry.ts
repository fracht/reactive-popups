import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';

export type PopupsRegistry = Record<
    PopupIdentifier['groupId'],
    Record<PopupIdentifier['id'], Popup<object>>
>;
