import { PopupGroup } from './PopupGroup';
import { usePopupsByGroup } from '../hooks/usePopupsByGroup';

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer = ({ group }: PopupsRendererProps) => {
    const popups = usePopupsByGroup(group);

    return popups;
};
