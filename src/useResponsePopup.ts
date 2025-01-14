import { type ComponentType, useCallback, useEffect, useRef } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid';

import { useIdentifier } from './IdentifierContext';
import type { PopupGroup } from './PopupGroup';
import { type Popup, type PopupIdentifier, PopupsContext } from './PopupsContext';
import { useEvent } from './useEvent';
import type { OptionalParamFunction } from './usePopup';

interface ResponsePopup<P, R> extends Popup<P> {
	type: 'response';
	resolve: (value: R | PromiseLike<R>) => void;
	reject: (reason?: unknown) => void;
	isSettled: boolean;
}

const isResponsePopup = <P, R>(popup: Popup<P>): popup is ResponsePopup<P, R> => popup.type === 'response';

export type UseResponsePopupBag<P, K extends keyof P, R> = OptionalParamFunction<Omit<P, K>, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
	PopupComponent: ComponentType<P>,
	props: Pick<P, K>,
	group: PopupGroup,
): UseResponsePopupBag<P, K, R> => {
	const { mount, unmount } = useSafeContext(PopupsContext);

	const popupIdentifierRef = useRef<PopupIdentifier>({
		id: nanoid(),
		groupId: group.groupId,
	});

	const defaultClose = useCallback(() => {
		unmount(popupIdentifierRef.current);
	}, [unmount]);

	const waitResponse = useEvent((omittedProps?: Omit<P, K>) => {
		let popup: ResponsePopup<P, R> | null = null;

		const promise = new Promise<R>((resolve, reject) => {
			popup = {
				PopupComponent,
				props: { ...props, ...omittedProps } as P,
				popupIdentifier: popupIdentifierRef.current,
				close: defaultClose,
				resolve,
				reject,
				type: 'response',
				isSettled: false,
			};

			mount(popup);
		});

		promise.finally(() => {
			popup!.isSettled = true;
		});

		return promise;
	});

	return waitResponse;
};

export type ResponseHandler<R> = {
	resolve: (value: R | PromiseLike<R>) => void;
	reject: (reason?: unknown) => void;
	unmount: () => void;
};

export const useResponseHandler = <R>(close?: () => void): ResponseHandler<R> => {
	const { getPopup, close: closePopup, unmount: unmountPopup } = useSafeContext(PopupsContext);
	const popupIdentifier = useIdentifier();

	const popupRef = useRef<ResponsePopup<object, R> | null>(null);

	const resolve = useCallback(
		(value: R | PromiseLike<R>) => {
			popupRef.current!.resolve!(value);
			closePopup(popupIdentifier);
		},
		[closePopup, popupIdentifier],
	);

	const reject = useCallback(
		(reason?: unknown) => {
			popupRef.current!.reject!(reason);
			closePopup(popupIdentifier);
		},
		[closePopup, popupIdentifier],
	);

	const unmount = useCallback(() => {
		if (!popupRef.current!.isSettled) {
			throw new Error('Promise from ResponsePopup was not settled (memory leak).');
		}

		unmountPopup(popupIdentifier);
	}, [popupIdentifier, unmountPopup]);

	useEffect(() => {
		const popup = getPopup(popupIdentifier);

		if (!isResponsePopup(popup!)) {
			throw new Error('useResponseHandler hook must be used only in popups created with useResponsePopup.');
		}

		if (close) {
			popup.close = close;
		}
		popupRef.current = popup;
	}, [getPopup, popupIdentifier, close]);

	return { resolve, reject, unmount };
};
