import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsRegistry } from '../types/PopupsRegistry';

type AddAction = {
    type: 'add';
    popupIdentifier: PopupIdentifier;
    popup: Popup<unknown>;
};

type RemoveAction = {
    type: 'remove';
    popupIdentifier: PopupIdentifier;
};

type SetCloseHandlerAction = {
    type: 'setCloseHandler';
    popupIdentifier: PopupIdentifier;
    close?: () => void | Promise<void>;
};

type PopupsAction = AddAction | RemoveAction | SetCloseHandlerAction;

export const popupsReducer = (
    { popups }: { popups: PopupsRegistry },
    action: PopupsAction
) => {
    if (action.type === 'add') {
        const {
            popup,
            popupIdentifier: { groupId, id },
        } = action;

        if (!popups[groupId]) {
            popups[groupId] = {};
        }

        popups[groupId][id] = popup;

        return {
            popups,
        };
    }

    if (action.type === 'remove') {
        const { groupId, id } = action.popupIdentifier;

        delete popups[groupId][id];

        return {
            popups,
        };
    }

    if (action.type === 'setCloseHandler') {
        const { groupId, id } = action.popupIdentifier;

        popups[groupId][id].close = action.close;

        return {
            popups,
        };
    }

    throw new Error();
};
