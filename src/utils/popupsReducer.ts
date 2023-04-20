import { Popup } from '../types/Popup';
import { ControlledPopupIdentifier } from '../types/PopupIdentifier';
import { PopupsRegistry } from '../types/PopupsRegistry';

export enum ActionType {
    MOUNT,
    UNMOUNT,
}

type MountAction = {
    type: ActionType.MOUNT;
    payload: {
        popup: Popup<object>;
    };
};

type UnmountAction = {
    type: ActionType.UNMOUNT;
    payload: {
        popupIdentifier: ControlledPopupIdentifier;
    };
};

export type PopupsAction = MountAction | UnmountAction;

export type PopupsState = { popups: PopupsRegistry };

export const popupsReducer = (
    { popups }: PopupsState,
    action: PopupsAction
) => {
    switch (action.type) {
        case ActionType.MOUNT: {
            const { popup } = action.payload;
            const {
                popupIdentifier: { groupId, id },
            } = popup;

            if (!popups[groupId]) {
                popups[groupId] = {};
            }

            popups[groupId][id] = popup;

            return {
                popups,
            };
        }

        case ActionType.UNMOUNT: {
            const { groupId, id } = action.payload.popupIdentifier;

            delete popups[groupId][id];

            return {
                popups,
            };
        }

        default: {
            throw new Error('Action type is not valid');
        }
    }
};
