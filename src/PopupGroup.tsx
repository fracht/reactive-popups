import React, {
	type ComponentType,
	Fragment,
	type FunctionComponent,
	type PropsWithChildren,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { IdentifierContextProvider } from './IdentifierContext';
import { type Popup, type PopupIdentifier, PopupsContext } from './PopupsContext';

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
	Root: ComponentType<PropsWithChildren>;
};

export const createPopupGroup = (): PopupGroup => {
	const group: PopupGroup = () => {
		return <PopupsRenderer group={group} />;
	};

	group.groupId = Symbol();

	group.Root = (({ children }: PropsWithChildren) => {
		const [innerPopups, setInnerPopups] = useState<Record<PopupIdentifier['id'], Popup<object>>>({});

		const innerPopupsRef = useRef(innerPopups);
		innerPopupsRef.current = innerPopups;

		const {
			getPopup: parentGetPopup,
			unmount: parentUnmount,
			mount: parentMount,
			close: parentClose,
			popupsState: parentPopupsState,
			update: parentUpdate,
		} = useSafeContext(PopupsContext);

		const getPopup = useCallback(
			(popupIdentifier: PopupIdentifier) => {
				const { groupId, id } = popupIdentifier;

				if (groupId !== group.groupId) {
					return parentGetPopup(popupIdentifier);
				}

				const popups = innerPopupsRef.current;
				if (!popups[id]) {
					return null;
				}

				return popups[id];
			},
			[parentGetPopup],
		);

		const unmount = useCallback(
			(popupIdentifier: PopupIdentifier) => {
				const { groupId, id } = popupIdentifier;

				if (groupId !== group.groupId) {
					return parentUnmount(popupIdentifier);
				}

				setInnerPopups((popups) => {
					delete popups[id];
					return {
						...popups,
					};
				});
			},
			[parentUnmount],
		);

		const mount = useCallback(
			<P,>(popup: Popup<P>) => {
				const { groupId, id } = popup.popupIdentifier;

				if (groupId !== group.groupId) {
					return parentMount(popup);
				}

				setInnerPopups((popups) => {
					popups[id] = popup as unknown as Popup<object>;
					return {
						...popups,
					};
				});

				return popup.popupIdentifier;
			},
			[parentMount],
		);

		const update = useCallback(
			(popupIdentifier: PopupIdentifier, props: object) => {
				const { groupId, id } = popupIdentifier;

				if (groupId !== group.groupId) {
					return parentUpdate(popupIdentifier, props);
				}

				setInnerPopups((popups) => {
					popups[id].props = props;
					return {
						...popups,
					};
				});
			},
			[parentUpdate],
		);

		const close = useCallback(
			(popupIdentifier: PopupIdentifier) => {
				const { groupId, id } = popupIdentifier;

				if (groupId !== group.groupId) {
					return parentClose(popupIdentifier);
				}

				const popup = innerPopupsRef.current[id];
				popup?.close();
			},
			[parentClose],
		);

		return (
			<PopupsContext.Provider
				value={{
					close,
					getPopup,
					mount,
					popupsState: {
						popups: {
							...parentPopupsState.popups,
							[group.groupId]: innerPopups,
						},
					},
					unmount,
					update,
				}}
			>
				{children}
			</PopupsContext.Provider>
		);
	}) as ComponentType<PropsWithChildren>;

	return group;
};
