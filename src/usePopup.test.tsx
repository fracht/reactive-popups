import React from 'react';
import { renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import { createPopupGroup } from './PopupGroup';
import { PopupsContext, type PopupsState } from './PopupsContext';
import { usePopup } from './usePopup';

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

it('should call mount function with the same popupIdentifier', () => {
	const MockComponent = vi.fn();
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });
	const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
	});

	const [open] = result.current;

	open();
	const firstId = context.mount.mock.calls[0][0].popupIdentifier;

	open();
	const secondId = context.mount.mock.calls[1][0].popupIdentifier;

	expect(firstId).toStrictEqual(secondId);
});

it('should call close', () => {
	const MockComponent = vi.fn();
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });
	const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
	});

	const [open, close] = result.current;

	open();
	const id = context.mount.mock.calls[0][0].popupIdentifier;

	close();
	expect(context.close).toBeCalledWith(id);
});

it('should rerender component with new props', () => {
	type MockComponentProps = {
		message: string;
	};
	const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });
	const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
	});

	const [open] = result.current;

	open({ message: 'first' });
	expect(context.mount.mock.calls[0][0].props.message).toBe('first');

	open({ message: 'second' });
	expect(context.mount.mock.calls[1][0].props.message).toBe('second');
});

it('should merge props', () => {
	type MockComponentProps = {
		age: number;
		message: string;
	};
	const MockComponent = vi.fn(({ message, age }: MockComponentProps) => <div>{message + age}</div>);
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });
	const { result } = renderHook(() => usePopup(MockComponent, { age: 42 }, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
	});

	const [open] = result.current;

	open({ message: 'first' });
	expect(context.mount.mock.calls[0][0].props).toStrictEqual({
		message: 'first',
		age: 42,
	});
});

it('should update popup when props change', () => {
	type MockComponentProps = {
		message: string;
	};
	const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });
	const { result, rerender } = renderHook((props: MockComponentProps) => usePopup(MockComponent, props, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
		initialProps: {
			message: 'first',
		},
	});

	const [open] = result.current;

	open();
	const id = context.mount.mock.calls[0][0].popupIdentifier;
	expect(context.mount.mock.calls[0][0].props.message).toBe('first');

	rerender({
		message: 'second',
	});

	expect(context.update).toBeCalledTimes(1);
	expect(context.update.mock.calls[0][0]).toStrictEqual(id);
	expect(context.update.mock.calls[0][1]).toStrictEqual({
		message: 'second',
	});
});

it('should make shallow compare on values in props before calling update', () => {
	type MockComponentProps = {
		message: string;
		value: {
			hello: number;
		};
	};
	const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
	const MyGroup = createPopupGroup();
	const context = createMockPopupsContext({ popups: {} });

	const initialValue = {
		hello: 42,
	};

	const { result, rerender } = renderHook((props: MockComponentProps) => usePopup(MockComponent, props, MyGroup), {
		wrapper: ({ children }) => (
			<PopupsContext.Provider value={context}>
				<MyGroup />
				{children}
			</PopupsContext.Provider>
		),
		initialProps: {
			message: 'first',
			value: initialValue,
		},
	});

	const [open] = result.current;

	open();

	// change nothing
	rerender({
		message: 'first',
		value: initialValue,
	});

	expect(context.update).toBeCalledTimes(0);

	// change message
	rerender({
		message: 'second',
		value: initialValue,
	});

	expect(context.update).toBeCalledTimes(1);

	// add new key 'test'
	rerender({
		message: 'second',
		value: initialValue,
		test: 'asdf',
	} as MockComponentProps);

	expect(context.update).toBeCalledTimes(2);

	// change object value
	rerender({
		message: 'second',
		value: {
			hello: 12,
		},
		test: 'asdf',
	} as MockComponentProps);

	expect(context.update).toBeCalledTimes(3);
});
