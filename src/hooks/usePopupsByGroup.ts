import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';

export const usePopupsByGroup = (group: PopupGroup): Popup<object>[] => {
    const { popupsState } = usePopupsContext();

    if (!popupsState.popups[group.groupId]) {
        return [];
    }

    return Object.values(popupsState.popups[group.groupId]);
};
