import { ReactElement } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { renderPopups } from '../utils/renderPopups';

export const usePopupsByGroup = (group: PopupGroup): ReactElement[] => {
    const { getPopupsByGroup } = usePopupsContext();

    const popups = getPopupsByGroup(group);

    return renderPopups(popups);
};
