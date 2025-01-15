import React, { type ComponentType, Fragment, type FunctionComponent } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { IdentifierContextProvider } from './IdentifierContext';
import { type Popup, PopupsContext } from './PopupsContext';

export const usePopupsByGroup = (group: PopupGroup): Popup<object>[] => {
	const { popupsState } = useSafeContext(PopupsContext);

	if (!popupsState.popups[group.groupId]) {
		return [];
	}

	return Object.values(popupsState.popups[group.groupId]);
};

type PopupsRendererProps = {
	group: PopupGroup;
};

const PopupsRenderer: FunctionComponent<PopupsRendererProps> = ({ group }) => {
	const popups = usePopupsByGroup(group);

	return (
		<Fragment>
			{popups.map(({ PopupComponent, props, popupIdentifier }) => (
				<IdentifierContextProvider key={popupIdentifier.id} popupIdentifier={popupIdentifier}>
					<PopupComponent {...(props as object)} />
				</IdentifierContextProvider>
			))}
		</Fragment>
	);
};

export type PopupGroup = ComponentType & {
	groupId: symbol;
};

export const createPopupGroup = (): PopupGroup => {
	const group: PopupGroup = () => {
		return <PopupsRenderer group={group} />;
	};

	group.groupId = Symbol();

	return group;
};
