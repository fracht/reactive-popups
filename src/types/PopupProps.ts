import { PopupIdentifier } from './PopupIdentifier';

export type PopupProps = {
    unmount: () => void;
    popupIdentifier: PopupIdentifier;
};
