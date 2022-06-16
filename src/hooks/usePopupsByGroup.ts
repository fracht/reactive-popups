import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';

export const usePopupsByGroup = (group: PopupGroup): Popup<unknown>[] => {
    const { getPopupsByGroup } = usePopupsContext();
    return getPopupsByGroup(group);
};
