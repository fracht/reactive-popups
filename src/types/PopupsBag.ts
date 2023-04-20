import { Popup } from './Popup';
import { ControlledPopupIdentifier } from './PopupIdentifier';
import { PopupsState } from '../utils/popupsReducer';

export type PopupsBag = {
    mount: <P>(popup: Popup<P>) => ControlledPopupIdentifier;
    unmount: (popupIdentifier: ControlledPopupIdentifier) => void;
    close: (popupIdentifier: ControlledPopupIdentifier) => void;

    popupsState: PopupsState;
    getPopup: (
        popupIdentifier: ControlledPopupIdentifier
    ) => Popup<object> | null;
};
