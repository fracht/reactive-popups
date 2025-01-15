import type { Popup } from './PopupsContext';

export interface ResponsePopup<P, R> extends Popup<P> {
	type: 'response';
	resolve: (value: R | PromiseLike<R>) => void;
	reject: (reason?: unknown) => void;
	isSettled: boolean;
}

export const isResponsePopup = <P, R>(popup: Popup<P>): popup is ResponsePopup<P, R> => popup.type === 'response';
