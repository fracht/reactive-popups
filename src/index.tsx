import { ComponentType, Fragment, PropsWithChildren, ReactNode, useCallback, useRef, useState } from 'react';
import { createSafeContext, useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid';

export type PopupIdentifier = {
	groupId: symbol;
	id: string;
};

export type Popup = {
	content: ReactNode;
	id: PopupIdentifier;
};

export type PopupsRegistry = Record<symbol, Record<string, Popup>>;

export type PopupsContextType = {
	mount: (popup: Popup) => void;
	unmount: (id: PopupIdentifier) => void;
	popups: PopupsRegistry;
};

export const PopupsContext = createSafeContext<PopupsContextType>();

export const usePopupsState = (): PopupsContextType => {
	const [popups, setPopups] = useState<PopupsRegistry>({});

	const mount = useCallback((popup: Popup) => {
		const {
			id: { id, groupId },
		} = popup;

		setPopups((popups) => {
			if (!popups[groupId]) {
				popups[groupId] = {};
			}

			popups[groupId][id] = popup;

			return {
				...popups,
			};
		});
	}, []);

	const unmount = useCallback(({ groupId, id }: PopupIdentifier) => {
		setPopups((popups) => {
			delete popups[groupId][id];

			return {
				...popups,
			};
		});
	}, []);

	return {
		mount,
		unmount,
		popups,
	};
};

export const PopupsContextProvider = ({ children }: PropsWithChildren<{}>) => {
	const popupsState = usePopupsState();

	return <PopupsContext.Provider value={popupsState}>{children}</PopupsContext.Provider>;
};

export type PopupGroup = ComponentType & {
	groupId: symbol;
};

export type GroupRootProps = {
	group: PopupGroup;
};

export const GroupRoot = ({ group: { groupId } }: GroupRootProps) => {
	const { popups } = useSafeContext(PopupsContext);

	const group = popups[groupId];

	return (
		<Fragment>
			{Object.values(group).map(({ content, id }) => (
				<Fragment key={id.id}>{content}</Fragment>
			))}
		</Fragment>
	);
};

export const createPopupGroup = () => {
	const group: PopupGroup = (() => {
		return <GroupRoot group={group} />;
	}) as unknown as PopupGroup;

	group.groupId = Symbol();

	return group;
};

export type UsePopupConfig = {
	content: ReactNode;
	group: PopupGroup;
};

export const usePopup = ({ content, group }: UsePopupConfig) => {
	const { mount, unmount } = useSafeContext(PopupsContext);

	const id = useRef<PopupIdentifier>({
		id: nanoid(),
		groupId: group.groupId,
	});

	const open = useCallback(() => {
		mount({
			content,
			id: id.current,
		});
	}, []);

	const close = useCallback(() => {
		unmount(id.current);
	}, []);

	return [open, close];
};
