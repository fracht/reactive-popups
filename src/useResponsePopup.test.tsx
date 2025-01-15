import React from 'react';
import { renderHook } from '@testing-library/react';
import type { Mock } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

import { IdentifierContextProvider } from './IdentifierContext';
import { createPopupGroup } from './PopupGroup';
import { type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';
import type { ResponsePopup } from './ResponsePopup';
import { useResponseHandler, useResponsePopup } from './useResponsePopup';

const createMockPopupsContext = (
	popupsState: PopupsState,
	getPopup: Mock<() => null | ResponsePopup<object, void>> = vi.fn(() => null),
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

const createMockPopup = (id: PopupIdentifier): ResponsePopup<object, void> => {
	const close = vi.fn();
	const PopupComponent = vi.fn();
	const props = {};
	const resolve = vi.fn();
	const reject = vi.fn();
	return {
		close,
		PopupComponent,
		popupIdentifier: id,
		props,
		type: 'response',
		isSettled: false,
		reject,
		resolve,
	};
};

describe('useResponsePopup', () => {
	it('should return a function that mounts a popup with promise utilities and returns that promise', async () => {
		const MyGroup = createPopupGroup();
		const MockComponent = vi.fn();
		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => useResponsePopup(MockComponent, {}, MyGroup), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		const promise = result.current();

		expect(promise instanceof Promise).toBeTruthy();
		expect(context.mount).toBeCalled();

		const popup = context.mount.mock.calls[0][0];
		expect(popup.type).toBe('response');
		expect(typeof popup.resolve).toBe('function');
		expect(typeof popup.reject).toBe('function');
		expect(popup.isSettled).toBeFalsy();

		popup.resolve();
		await promise;
		expect(popup.isSettled).toBeTruthy();
	});

	it('should merge props', () => {
		const MyGroup = createPopupGroup();
		type MockComponentProps = {
			message: string;
			age: number;
		};
		const MockComponent = vi.fn(({ message, age }: MockComponentProps) => <div>{message + age}</div>);
		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => useResponsePopup(MockComponent, { message: 'asdf' }, MyGroup), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		result.current({ age: 42 });

		expect(context.mount.mock.calls[0][0].props).toStrictEqual({
			message: 'asdf',
			age: 42,
		});
	});
});

describe('useResponseHandler', () => {
	it('should throw an error when popup is null', () => {
		const MyGroup = createPopupGroup();
		const context = createMockPopupsContext({ popups: {} });

		expect(() =>
			renderHook(() => useResponseHandler(), {
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

	it('should return resolve, reject and unmount functions', () => {
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

		const { result } = renderHook(() => useResponseHandler(), {
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

		result.current.resolve(42);
		result.current.reject();

		expect(Popup.resolve).toBeCalled();
		expect(Popup.reject).toBeCalled();
		expect(context.close).toBeCalledTimes(2);

		expect(() => result.current.unmount()).toThrow();

		Popup.isSettled = true;

		result.current.unmount();
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

		renderHook(() => useResponseHandler(close), {
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
});
