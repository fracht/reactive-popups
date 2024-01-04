import { ComponentType, useState } from 'react';

export type Popup = {
	Component: ComponentType;
	props: object;
	id: string;
};

export type PopupsControl = {
	popups: Popup[];
	addPopup: (popup: Popup) => void;
	removePopup: (id: string) => void;
};

export const usePopupsControl = (): PopupsControl => {
	const [popups, setPopups] = useState<Popup[]>([]);

	const addPopup = (popup: Popup) => {
		setPopups((old) => {
			const idx = old.findIndex(({ id }) => id === popup.id);

			if (idx === -1) {
				return [...old, popup];
			}

			old[idx] = popup;
			return [...old];
		});
	};

	const removePopup = (popupId: string) => {
		setPopups((old) => {
			const idx = old.findIndex(({ id }) => id === popupId);
			if (idx === -1) {
				return old;
			}
			old.splice(idx, 1);
			return [...old];
		});
	};

	return { popups, addPopup, removePopup };
};
