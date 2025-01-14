import React, { type ComponentType, type PropsWithChildren, useCallback, useReducer, useRef } from 'react';
import { createSafeContext } from '@sirse-dev/safe-context';

export type PopupIdentifier = {
	groupId: symbol;
	id: string;
};

export type PopupsRegistry = Record<PopupIdentifier['groupId'], Record<PopupIdentifier['id'], Popup<object>>>;

export type PopupsState = { popups: PopupsRegistry };

export interface Popup<P> {
	PopupComponent: ComponentType<P>;
	props: P;
	popupIdentifier: PopupIdentifier;
	close: () => void | Promise<void>;
	type: string;
}

export type PopupsBag = {
	mount: <P>(popup: Popup<P>) => PopupIdentifier;
	unmount: (popupIdentifier: PopupIdentifier) => void;
	update: (popupIdentifier: PopupIdentifier, props: object) => void;
	close: (popupIdentifier: PopupIdentifier) => void;

	popupsState: PopupsState;
	getPopup: (popupIdentifier: PopupIdentifier) => Popup<object> | null;
};

export const PopupsContext = createSafeContext<PopupsBag>();

export enum ActionType {
	MOUNT,
	UNMOUNT,
	UPDATE,
}

type MountAction = {
	type: ActionType.MOUNT;
	payload: {
		popup: Popup<object>;
	};
};

type UnmountAction = {
	type: ActionType.UNMOUNT;
	payload: {
		popupIdentifier: PopupIdentifier;
	};
};

type UpdateAction = {
	type: ActionType.UPDATE;
	payload: {
		popupIdentifier: PopupIdentifier;
		props: object;
	};
};

export type PopupsAction = MountAction | UnmountAction | UpdateAction;

const popupsReducer = (prevState: PopupsState, action: PopupsAction) => {
	const { popups } = prevState;

	switch (action.type) {
		case ActionType.MOUNT: {
			const { popup } = action.payload;

			const {
				popupIdentifier: { groupId, id },
			} = popup;

			if (!popups[groupId]) {
				popups[groupId] = {};
			}

			popups[groupId][id] = popup;

			return {
				popups,
			};
		}

		case ActionType.UPDATE: {
			const { popupIdentifier, props } = action.payload;

			const { groupId, id } = popupIdentifier;

			if (!popups[groupId]?.[id]) {
				return prevState;
			}

			popups[groupId][id].props = props;

			return {
				popups,
			};
		}

		case ActionType.UNMOUNT: {
			const { groupId, id } = action.payload.popupIdentifier;

			delete popups[groupId][id];

			return {
				popups,
			};
		}

		default: {
			throw new Error('Action type is not valid');
		}
	}
};

export const PopupsContextProvider = ({ children }: PropsWithChildren) => {
	const [popupsState, dispatch] = useReducer(popupsReducer, { popups: {} });

	const popupsStateRef = useRef(popupsState);
	popupsStateRef.current = popupsState;

	const getPopup = useCallback(({ groupId, id }: PopupIdentifier) => {
		const popups = popupsStateRef.current.popups;

		if (!popups[groupId] || !popups[groupId][id]) {
			return null;
		}

		return popups[groupId][id];
	}, []);

	const unmount = useCallback((popupIdentifier: PopupIdentifier) => {
		dispatch({ type: ActionType.UNMOUNT, payload: { popupIdentifier } });
	}, []);

	const mount = useCallback(<P,>(popup: Popup<P>) => {
		dispatch({
			type: ActionType.MOUNT,
			payload: {
				popup: popup as unknown as Popup<object>,
			},
		});

		return popup.popupIdentifier;
	}, []);

	const update = useCallback((popupIdentifier: PopupIdentifier, props: object) => {
		dispatch({
			type: ActionType.UPDATE,
			payload: {
				popupIdentifier,
				props,
			},
		});
	}, []);

	const close = useCallback(
		(popupIdentifier: PopupIdentifier) => {
			const popup = getPopup(popupIdentifier);
			popup?.close();
		},
		[getPopup],
	);

	return (
		<PopupsContext.Provider
			value={{
				mount,
				unmount,
				update,
				getPopup,
				close,
				popupsState,
			}}
		>
			{children}
		</PopupsContext.Provider>
	);
};
