import { ComponentType, useRef } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid/non-secure';

import { PopupGroup } from './createPopupGroup';

export const usePopup = (Component: ComponentType, props: object, group: PopupGroup) => {
	const { addPopup, removePopup } = useSafeContext(group.context);

	const id = useRef(nanoid());

	const open = () => {
		addPopup({ Component, props, id: id.current });
	};

	const close = () => {
		removePopup(id.current);
	};

	return [open, close];
};
