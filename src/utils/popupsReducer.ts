import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsRegistry } from '../types/PopupsRegistry';

export enum ActionType {
    MOUNT,
    UNMOUNT,
    UPDATE,
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
        popupIdentifier: PopupIdentifier;
    };
};

type UpdateAction = {
    type: ActionType.UPDATE;
    payload: {
        popupIdentifier: PopupIdentifier;
        props: object;
    };
};

export type PopupsAction = MountAction | UnmountAction | UpdateAction;

export type PopupsState = { popups: PopupsRegistry };

export const popupsReducer = (prevState: PopupsState, action: PopupsAction) => {
    const { popups } = prevState;

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

        case ActionType.UPDATE: {
            const { popupIdentifier, props } = action.payload;

            const { groupId, id } = popupIdentifier;

            if (!popups[groupId]?.[id]) {
                return prevState;
            }

            popups[groupId][id].props = props;

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
