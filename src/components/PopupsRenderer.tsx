import React from 'react';

import { PopupGroup } from './PopupGroup';
import { usePopupsByGroup } from '../hooks/usePopupsByGroup';
import { renderPopups } from '../utils/renderPopups';

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer: React.FunctionComponent<PopupsRendererProps> = ({
    group,
}) => {
    const popups = usePopupsByGroup(group);

    return <React.Fragment>{renderPopups(popups)}</React.Fragment>;
};
