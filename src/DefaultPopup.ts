import type { Popup } from './PopupsContext';

export interface DefaultPopup<P> extends Popup<P> {
	type: 'default';
}

export const isDefaultPopup = <P>(popup: Popup<P>): popup is DefaultPopup<P> => popup.type === 'default';
