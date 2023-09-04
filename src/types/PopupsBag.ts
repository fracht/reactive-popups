import { Popup } from './Popup';
import { PopupIdentifier } from './PopupIdentifier';
import { PopupsState } from '../utils/popupsReducer';

export type PopupsBag = {
	mount: <P>(popup: Popup<P>) => PopupIdentifier;
	unmount: (popupIdentifier: PopupIdentifier) => void;
	close: (popupIdentifier: PopupIdentifier) => void;

	popupsState: PopupsState;
	getPopup: (popupIdentifier: PopupIdentifier) => Popup<object> | null;
};
