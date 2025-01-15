import React, { createElement, isValidElement } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { act, render, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createPopupGroup, usePopupsByGroup } from './PopupGroup';
import { type Popup, type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';

const createMockPopup = (
	popupIdentifier: PopupIdentifier = {
		groupId: Symbol(),
		id: 'mock',
	},
): Popup<object> => {
	const close = vi.fn();
	const PopupComponent = vi.fn();
	const props = {};
	return {
		close,
		PopupComponent,
		popupIdentifier,
		props,
		type: 'mock',
	};
};

const createMockPopupsContext = (popupsState: PopupsState) => {
	const close = vi.fn();
	const mount = vi.fn();
	const unmount = vi.fn();
	const getPopup = vi.fn();
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

describe('usePopupsByGroup', () => {
	it('should return popups', () => {
		const group = createPopupGroup();
		const mockPopup = createMockPopup();
		const popupsState: PopupsState = {
			popups: {
				[group.groupId]: {
					asdf: mockPopup,
				},
			},
		};

		const context = createMockPopupsContext(popupsState);

		const { result } = renderHook(() => usePopupsByGroup(group), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(result.current).toStrictEqual([mockPopup]);
	});

	it('should return empty array', () => {
		const group = createPopupGroup();

		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => usePopupsByGroup(group), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(result.current).toStrictEqual([]);
	});
});

describe('createPopupGroup', () => {
	it('should return valid react component with groupId property', () => {
		const context = createMockPopupsContext({ popups: {} });
		const MyGroup = createPopupGroup();

		render(<MyGroup />, {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(MyGroup.groupId).toBeDefined();
		expect(isValidElement(createElement(MyGroup)));
	});

	it('should provide intercepted context via Group.Root to intercept calls related to current group id', () => {
		const context = createMockPopupsContext({ popups: {} });
		const MyGroup = createPopupGroup();
		const CustomGroup = createPopupGroup();

		const { result } = renderHook(() => useSafeContext(PopupsContext), {
			wrapper: ({ children }) => (
				<PopupsContext.Provider value={context}>
					<MyGroup />

					<MyGroup.Root>
						<MyGroup />
						{children}
					</MyGroup.Root>
				</PopupsContext.Provider>
			),
		});

		const myGroupId = {
			id: 'test-id-1',
			groupId: MyGroup.groupId,
		};
		const MyGroupPopup = createMockPopup(myGroupId);

		const customGroupId = {
			id: 'test-id-2',
			groupId: CustomGroup.groupId,
		};
		const CustomGroupPopup = createMockPopup(customGroupId);

		// mount
		act(() => {
			result.current.mount(MyGroupPopup);
		});

		expect(result.current.popupsState.popups[MyGroup.groupId]['test-id-1']).toBe(MyGroupPopup);

		result.current.mount(CustomGroupPopup);
		expect(context.mount).toBeCalledWith(CustomGroupPopup);

		// update
		act(() => {
			result.current.update(myGroupId, { hello: 'asdf' });
		});

		expect(result.current.popupsState.popups[MyGroup.groupId]['test-id-1'].props).toStrictEqual({ hello: 'asdf' });

		result.current.update(customGroupId, { test: 'hello' });
		expect(context.update).toBeCalled();
		expect(context.update.mock.calls[0][0]).toStrictEqual(customGroupId);
		expect(context.update.mock.calls[0][1]).toStrictEqual({ test: 'hello' });

		// getPopup
		expect(result.current.getPopup(myGroupId)).toBe(MyGroupPopup);

		result.current.getPopup(customGroupId);
		expect(context.getPopup).toBeCalled();
		expect(context.getPopup.mock.calls[0][0]).toStrictEqual(customGroupId);

		// close
		result.current.close(myGroupId);
		expect(MyGroupPopup.close).toBeCalled();

		result.current.close(customGroupId);
		expect(context.close).toBeCalled();

		// unmount
		act(() => {
			result.current.unmount(myGroupId);
		});

		expect(result.current.popupsState.popups[MyGroup.groupId]['test-id-1']).toBeUndefined();

		result.current.unmount(customGroupId);
		expect(context.unmount).toBeCalled();
		expect(context.unmount.mock.calls[0][0]).toStrictEqual(customGroupId);
	});
});
