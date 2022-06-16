import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';

export const usePopupsByGroup = (group: PopupGroup) => {
    const { getPopupsByGroup } = usePopupsContext();
    return getPopupsByGroup(group);
};
