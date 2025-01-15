import React from 'react';
import { renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { createPopupGroup } from './PopupGroup';
import { PopupsContext, type PopupsState } from './PopupsContext';
import { usePopupsFactory } from './usePopupsFactory';

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

it('should call mount', () => {
	const MyGroup = createPopupGroup();
	const MockComponent = vi.fn();
	const context = createMockPopupsContext({ popups: {} });

	const { result } = renderHook(() => usePopupsFactory(MockComponent, {}, MyGroup), {
		wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
	});

	result.current();
	expect(context.mount).toBeCalled();
});

it('should call mount multiple times with different ids', () => {
	const MyGroup = createPopupGroup();
	const MockComponent = vi.fn();
	const context = createMockPopupsContext({ popups: {} });

	const { result } = renderHook(() => usePopupsFactory(MockComponent, {}, MyGroup), {
		wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
	});

	result.current();
	result.current();
	result.current();

	expect(context.mount).toBeCalledTimes(3);
	expect(new Set(context.mount.mock.calls.map((call) => call[0].popupIdentifier.id)).size).toBe(3);
});

it('should merge props', () => {
	const MyGroup = createPopupGroup();
	type MockComponentProps = {
		message: string;
		age: number;
	};
	const MockComponent = vi.fn(({ message, age }: MockComponentProps) => <div>{message + age}</div>);
	const context = createMockPopupsContext({ popups: {} });

	const { result } = renderHook(() => usePopupsFactory(MockComponent, { message: 'asdf' }, MyGroup), {
		wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
	});

	result.current({ age: 42 });

	expect(context.mount.mock.calls[0][0].props).toStrictEqual({ message: 'asdf', age: 42 });
});
