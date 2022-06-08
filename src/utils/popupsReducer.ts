import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsRegistry } from '../types/PopupsRegistry';

type AddAction = {
    type: 'add';
    payload: {
        popupIdentifier: PopupIdentifier;
        popup: Popup<unknown>;
    };
};

type RemoveAction = {
    type: 'remove';
    payload: {
        popupIdentifier: PopupIdentifier;
    };
};

type SetCloseHandlerAction = {
    type: 'setCloseHandler';
    payload: {
        popupIdentifier: PopupIdentifier;
        close?: () => void | Promise<void>;
    };
};

type SettlePopupAction = {
    type: 'settlePopup';
    payload: {
        popupIdentifier: PopupIdentifier;
    };
};

type PopupsAction =
    | AddAction
    | RemoveAction
    | SetCloseHandlerAction
    | SettlePopupAction;

export const popupsReducer = (
    { popups }: { popups: PopupsRegistry },
    action: PopupsAction
) => {
    switch (action.type) {
        case 'add': {
            const {
                popup,
                popupIdentifier: { groupId, id },
            } = action.payload;

            if (!popups[groupId]) {
                popups[groupId] = {};
            }

            popups[groupId][id] = popup;

            return {
                popups,
            };
        }

        case 'remove': {
            const { groupId, id } = action.payload.popupIdentifier;

            delete popups[groupId][id];

            return {
                popups,
            };
        }

        case 'setCloseHandler': {
            const {
                popupIdentifier: { groupId, id },
                close,
            } = action.payload;

            popups[groupId][id].close = close;

            return {
                popups,
            };
        }

        case 'settlePopup': {
            const { groupId, id } = action.payload.popupIdentifier;

            popups[groupId][id].isSettled = true;

            return {
                popups,
            };
        }

        default: {
            throw new Error();
        }
    }
};
