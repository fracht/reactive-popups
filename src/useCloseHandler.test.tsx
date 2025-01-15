import React from 'react';
import { renderHook } from '@testing-library/react';
import type { Mock } from 'vitest';
import { expect, it, vi } from 'vitest';

import type { DefaultPopup } from './DefaultPopup';
import { IdentifierContextProvider } from './IdentifierContext';
import { createPopupGroup } from './PopupGroup';
import { type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';
import { useCloseHandler } from './useCloseHandler';

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
