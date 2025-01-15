import React, { useCallback, useEffect } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { type DefaultPopup, isDefaultPopup } from './DefaultPopup';
import { IdentifierContextProvider, useIdentifier } from './IdentifierContext';
import { type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';

export const useCloseHandler = (close?: () => void | Promise<void>): (() => void) => {
	const { getPopup, unmount } = useSafeContext(PopupsContext);

	const popupIdentifier = useIdentifier();

	const unmountPopup = useCallback(() => {
		unmount(popupIdentifier);
	}, [popupIdentifier, unmount]);

	useEffect(() => {
		const popup = getPopup(popupIdentifier);

		if (popup === null || !isDefaultPopup(popup)) {
			throw new Error(
				'`useCloseHandler` hook must be called only from default popups created by `usePopup` or `usePopupsFactory`.',
			);
		}

		if (close) {
			popup.close = close;
		}
	}, [popupIdentifier, close, getPopup]);

	return unmountPopup;
};

import { renderHook } from '@testing-library/react';
import type { Mock } from 'vitest';

import { createPopupGroup } from './PopupGroup';

if (import.meta.vitest) {
	const { it, expect, vi } = import.meta.vitest;

	const createMockPopupsContext = (
		popupsState: PopupsState,
		getPopup: Mock<() => null | DefaultPopup<object>> = vi.fn(() => null),
	) => {
		const close = vi.fn();
		const mount = vi.fn();
		const unmount = vi.fn();
		const update = vi.fn();

		return {
			close,
			mount,
			unmount,
			getPopup,
			update,
			popupsState,
		};
	};

	const createMockPopup = (id: PopupIdentifier): DefaultPopup<object> => {
		const close = vi.fn();
		const PopupComponent = vi.fn();
		const props = {};
		return {
			close,
			PopupComponent,
			popupIdentifier: id,
			props,
			type: 'default',
		};
	};

	it('should throw an error when popup is null', () => {
		const MyGroup = createPopupGroup();
		const context = createMockPopupsContext({ popups: {} });

		expect(() =>
			renderHook(() => useCloseHandler(), {
				wrapper: ({ children }) => (
					<PopupsContext.Provider value={context}>
						<IdentifierContextProvider
							popupIdentifier={{
								groupId: MyGroup.groupId,
								id: 'test-id',
							}}
						>
							{children}
						</IdentifierContextProvider>
					</PopupsContext.Provider>
				),
			}),
		).toThrow();
	});

	it('should return unmount function', () => {
		const MyGroup = createPopupGroup();
		const Popup = createMockPopup({ groupId: MyGroup.groupId, id: 'test-id' });
		const context = createMockPopupsContext(
			{
				popups: {
					[MyGroup.groupId]: {
						'test-id': Popup,
					},
				},
			},
			vi.fn(() => Popup),
		);

		const { result } = renderHook(() => useCloseHandler(), {
			wrapper: ({ children }) => (
				<PopupsContext.Provider value={context}>
					<IdentifierContextProvider
						popupIdentifier={{
							groupId: MyGroup.groupId,
							id: 'test-id',
						}}
					>
						{children}
					</IdentifierContextProvider>
				</PopupsContext.Provider>
			),
		});

		result.current();

		expect(context.unmount).toBeCalled();
	});

	it('should set close function on popup', () => {
		const MyGroup = createPopupGroup();
		const Popup = createMockPopup({ groupId: MyGroup.groupId, id: 'test-id' });
		const context = createMockPopupsContext(
			{
				popups: {
					[MyGroup.groupId]: {
						'test-id': Popup,
					},
				},
			},
			vi.fn(() => Popup),
		);

		const close = vi.fn();

		renderHook(() => useCloseHandler(close), {
			wrapper: ({ children }) => (
				<PopupsContext.Provider value={context}>
					<IdentifierContextProvider
						popupIdentifier={{
							groupId: MyGroup.groupId,
							id: 'test-id',
						}}
					>
						{children}
					</IdentifierContextProvider>
				</PopupsContext.Provider>
			),
		});

		expect(Popup.close).toBe(close);
	});
}
