import type { Popup } from './PopupsContext';

export interface DefaultPopup<P> extends Popup<P> {
	type: 'default';
}
