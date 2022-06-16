import { ReactElement } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { renderPopups } from '../components/PopupsRenderer';

export const usePopupsByGroup = (group: PopupGroup): ReactElement[] => {
    const { getPopupsByGroup } = usePopupsContext();

    return renderPopups(getPopupsByGroup(group));
};
