import { ComponentType, PropsWithChildren } from 'react';
import { createSafeContext, SafeContext, useSafeContext } from '@sirse-dev/safe-context';

import { PopupsControl, usePopupsControl } from './usePopupsControl';

export type PopupGroup = ComponentType<PropsWithChildren<{}>> & {
	context: SafeContext<PopupsControl>;
	Entry: ComponentType<{}>;
};

export const createPopupGroup = (): PopupGroup => {
	const GroupContext = createSafeContext<PopupsControl>();

	const Group = (({ children }: PropsWithChildren<{}>) => {
		const popupsControl = usePopupsControl();

		return <GroupContext.Provider value={popupsControl}>{children}</GroupContext.Provider>;
	}) as PopupGroup;

	Group.context = GroupContext;

	Group.Entry = (() => {
		const { popups } = useSafeContext(GroupContext);

		return popups.map(({ Component, props, id }) => <Component {...props} key={id} />);
	}) as ComponentType;

	return Group;
};
