import { FunctionComponent, Fragment } from 'react';
import { PopupGroup } from './PopupGroup';
import { usePopupsByGroup } from '../hooks/usePopupsByGroup';
import { renderPopups } from '../utils/renderPopups';

export type PopupsRendererProps = {
	group: PopupGroup;
};

export const PopupsRenderer: FunctionComponent<PopupsRendererProps> = ({ group }) => {
	const popups = usePopupsByGroup(group);

	return <Fragment>{renderPopups(popups)}</Fragment>;
};
