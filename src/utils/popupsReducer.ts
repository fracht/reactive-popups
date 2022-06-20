import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsRegistry } from '../types/PopupsRegistry';

type MountAction = {
    type: 'mount';
    payload: {
        popup: Popup<object>;
    };
};

type UnmountAction = {
    type: 'unmount';
    payload: {
        popupIdentifier: PopupIdentifier;
    };
};

export type PopupsAction = MountAction | UnmountAction;

export const popupsReducer = (
    { popups }: { popups: PopupsRegistry },
    action: PopupsAction
) => {
    switch (action.type) {
        case 'mount': {
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

        case 'unmount': {
            const { groupId, id } = action.payload.popupIdentifier;

            delete popups[groupId][id];

            return {
                popups,
            };
        }

        default: {
            throw new Error();
        }
    }
};
